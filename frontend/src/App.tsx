import React, { useEffect, useState } from 'react';
import {
  Navbar,
  HeroSection,
  EmergencySOSSection,
  AIFeaturesSection,
  HowItWorksSection,
  FloatingAIAssistant,
  SpotlightSection,
  NewAndNoteworthySection,
  MostBookedServicesSection,
  AllServicesCategorySections,
  ServiceCard,
  ServiceDetailModal,
  AIDiagnosticModal,
  BookingWizardModal,
  LiveTrackingModal,
  UserDashboard,
  PartnerDashboard,
  AIChatDrawer,
  APIDocsModal,
  AuthModal,
  AddressManagerModal,
  AdminPanelModal,
  ProviderProfileModal,
  AIVoiceAssistantModal,
  PostServiceFeedbackModal,
  InvoiceModal,
  CompareFloatingBar,
  CompareServicesModal,
  MobileBottomNav,
  DirectionsModal,
  PushNotificationToast,
  NotificationCenterModal,
  CartDrawer,
  CategoryPageView,
  SalonDermaModal,
  HelpCenterView,
  MyBookingsView,
  Footer,
} from './components';

import { CITIES, CATEGORIES, SERVICES, PARTNERS, MOCK_BOOKINGS } from './data/mockData';
import { getAllCategoryServices } from './components/layout/AllServicesCategorySections';
import { City, Category, ServiceItem, Booking, AIDiagnosis, Partner, User, ProviderProfile, AuthResponse, Notification as AppNotification, CartItem } from './types';
import { api } from './api/client';
import { pushService } from './utils/pushNotificationService';
import { searchServices } from './utils/searchHelper';
import { Sparkles, Zap, Wrench, ShoppingBag, CheckCircle2, WifiOff, ArrowRightLeft } from 'lucide-react';

export default function App() {
  const [cities, setCities] = useState<City[]>(CITIES);
  const [selectedCity, setSelectedCity] = useState<City>(CITIES[0]); // Bengaluru
  const [selectedLocality, setSelectedLocality] = useState<string>(CITIES[0].localities[0]);

  const [categories, setCategories] = useState<Category[]>(CATEGORIES);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all');
  const [activeCategoryPageView, setActiveCategoryPageView] = useState<Category | null>(null);
  const [activeCategoryInitialSubService, setActiveCategoryInitialSubService] = useState<string | undefined>(undefined);
  const [services, setServices] = useState<ServiceItem[]>(() => {
    const extra = getAllCategoryServices();
    const existingIds = new Set(SERVICES.map((s) => s.id));
    const newItems = extra.filter((s) => !existingIds.has(s.id));
    return [...SERVICES, ...newItems];
  });
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Compare Feature State (up to 3 services)
  const [compareList, setCompareList] = useState<ServiceItem[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false);

  // Authentication State
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [providerProfile, setProviderProfile] = useState<ProviderProfile | null>(null);

  // Modals & Drawers
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [isAddressesOpen, setIsAddressesOpen] = useState<boolean>(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState<boolean>(false);
  const [isProviderModalOpen, setIsProviderModalOpen] = useState<boolean>(false);
  const [invoiceBooking, setInvoiceBooking] = useState<Booking | null>(null);
  const [dashboardDefaultTab, setDashboardDefaultTab] = useState<'bookings' | 'trends' | 'refer_earn' | 'profile' | 'ai_history' | 'feedback'>('bookings');

  const [selectedServiceDetail, setSelectedServiceDetail] = useState<ServiceItem | null>(null);
  const [isBookingWizardOpen, setIsBookingWizardOpen] = useState<boolean>(false);
  const [bookingServiceTarget, setBookingServiceTarget] = useState<ServiceItem | null>(null);
  const [bookingIsUrgent, setBookingIsUrgent] = useState<boolean>(false);
  const [aiDiagnosisForBooking, setAiDiagnosisForBooking] = useState<AIDiagnosis | null>(null);

  // Bookings & Tracking
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS);
  const [activeLiveTrackingBooking, setActiveLiveTrackingBooking] = useState<Booking | null>(null);
  const [feedbackTargetBooking, setFeedbackTargetBooking] = useState<Booking | null>(null);

  // AI Tools
  const [isAIDoctorOpen, setIsAIDoctorOpen] = useState<boolean>(false);
  const [aiDoctorCategoryHint, setAiDoctorCategoryHint] = useState<string>('');
  const [isAIChatOpen, setIsAIChatOpen] = useState<boolean>(false);
  const [isAIVoiceOpen, setIsAIVoiceOpen] = useState<boolean>(false);
  const [voiceFeedbackTargetBooking, setVoiceFeedbackTargetBooking] = useState<{
    id: string;
    partnerId?: string;
    partnerName?: string;
    serviceTitle: string;
  } | null>(null);
  const [isAPIDocsOpen, setIsAPIDocsOpen] = useState<boolean>(false);
  const [isSalonDermaModalOpen, setIsSalonDermaModalOpen] = useState<boolean>(false);

  const handleOpenSalon = (subService?: string) => {
    const salonCat = categories.find((c) => c.id === 'salon');
    if (!salonCat) return;
    if (subService) {
      setActiveCategoryInitialSubService(subService);
      setActiveCategoryPageView(salonCat);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIsSalonDermaModalOpen(true);
    }
  };

  // Role & View State
  const [activeTab, setActiveTab] = useState<'services' | 'dashboard' | 'help' | 'my_bookings'>('services');
  const [walletBalance, setWalletBalance] = useState<number>(1250);
  const [isOffline, setIsOffline] = useState<boolean>(!navigator.onLine);

  // Push Notifications & Directions State
  const [isNotificationCenterOpen, setIsNotificationCenterOpen] = useState<boolean>(false);
  const [directionsModalBooking, setDirectionsModalBooking] = useState<Booking | null>(null);
  const [notifications, setNotifications] = useState<AppNotification[]>([
    {
      id: 'notif-welcome-1',
      userId: 'usr-customer-101',
      title: '⏰ 1-Hour Service Alert System Ready',
      message: 'UrgentLyfe will alert you 1 hour before scheduled service times with One-Click Turn-by-Turn GPS Directions.',
      read: false,
      is1HourAlert: true,
      type: 'REMINDER_1HR',
      createdAt: new Date().toISOString(),
    },
  ]);

  // Toast Notification
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 4000);
  };

  // Cart State & Actions
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const handleAddToCart = (service: ServiceItem) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.service.id === service.id);
      if (existing) {
        return prev.map((item) =>
          item.service.id === service.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { service, quantity: 1 }];
    });
    showToast(`Added "${service.title}" to cart!`);
  };

  const handleUpdateCartQuantity = (serviceId: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.service.id === serviceId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveFromCart = (serviceId: string) => {
    setCartItems((prev) => prev.filter((item) => item.service.id !== serviceId));
    showToast('Item removed from cart');
  };

  const handleClearCart = () => {
    setCartItems([]);
    showToast('Cart cleared');
  };

  const handleCheckoutCart = () => {
    if (cartItems.length === 0) return;
    setIsCartOpen(false);
    setBookingServiceTarget(cartItems[0].service);
    setBookingIsUrgent(false);
    setAiDiagnosisForBooking(null);
    setIsBookingWizardOpen(true);
  };

  const handleStartBooking = (service: ServiceItem, isUrgent = false) => {
    setBookingServiceTarget(service);
    setBookingIsUrgent(isUrgent);
    setAiDiagnosisForBooking(null);
    setIsBookingWizardOpen(true);
  };

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      const data = await api.getNotifications();
      if (Array.isArray(data) && data.length > 0) {
        setNotifications(data);
      }
    } catch (e) {
      // ignore
    }
  };

  const handleMarkNotificationRead = async (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    try {
      await api.markNotificationRead(id);
    } catch (e) {
      // ignore
    }
  };

  // Monitor network status
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Background 1-Hour Alert Scheduler & Check
  useEffect(() => {
    fetchNotifications();

    // Check bookings and register 1-hour alerts
    pushService.checkAndScheduleBookings(bookings, currentUser?.role === 'PROVIDER' ? 'PROVIDER' : 'CUSTOMER');

    const interval = setInterval(() => {
      pushService.checkAndScheduleBookings(bookings, currentUser?.role === 'PROVIDER' ? 'PROVIDER' : 'CUSTOMER');
      fetchNotifications();
    }, 25000);

    return () => {
      clearInterval(interval);
      pushService.clearTimers();
    };
  }, [bookings, currentUser]);

  // Restore JWT Session on App Mount
  useEffect(() => {
    const token = localStorage.getItem('urgentlyfe_jwt');
    if (token) {
      api
        .getCurrentUser()
        .then((res) => {
          setCurrentUser(res.user);
          if (res.providerProfile) {
            setProviderProfile(res.providerProfile);
          }
          if (res.user.walletBalance) {
            setWalletBalance(res.user.walletBalance);
          }
        })
        .catch(() => {
          localStorage.removeItem('urgentlyfe_jwt');
        });
    }
  }, []);

  // Synchronize Bookings with Server
  const refreshBookings = async () => {
    try {
      const serverBookings = await api.getBookings();
      if (serverBookings && Array.isArray(serverBookings) && serverBookings.length > 0) {
        setBookings(serverBookings);
      }
    } catch (e) {
      console.warn('Could not fetch server bookings, using current state', e);
    }
  };

  useEffect(() => {
    refreshBookings();
  }, []);

  useEffect(() => {
    if (activeTab === 'dashboard') {
      refreshBookings();
    }
  }, [activeTab]);

  // Filter services dynamically using smart search helper
  const { filtered: filteredServices, isSearchActive } = searchServices(
    services,
    categories,
    searchQuery,
    selectedCategoryId
  );

  // Handle Quick SOS Click
  const handleQuickSOS = () => {
    const sosService = services.find((s) => s.isUrgentAvailable) || services[0];
    setBookingServiceTarget(sosService);
    setBookingIsUrgent(true);
    setAiDiagnosisForBooking(null);
    setIsBookingWizardOpen(true);
  };

  // Handle AI Diagnosis Booking CTA
  const handleBookFromDiagnosis = (diagnosis: AIDiagnosis) => {
    const matchedService =
      services.find((s) => s.id === diagnosis.recommendedServiceId) || services[0];
    setBookingServiceTarget(matchedService);
    setBookingIsUrgent(diagnosis.severity === 'HIGH' || diagnosis.severity === 'CRITICAL');
    setAiDiagnosisForBooking(diagnosis);
    setIsBookingWizardOpen(true);
  };

  // Handle Auth Success
  const handleAuthSuccess = (authData: AuthResponse) => {
    setCurrentUser(authData.user);
    if (authData.providerProfile) {
      setProviderProfile(authData.providerProfile);
    }
    if (authData.user.walletBalance) {
      setWalletBalance(authData.user.walletBalance);
    }
    showToast(`Welcome ${authData.user.fullName}! Logged in as ${authData.user.role}.`);
  };

  // Logout
  const handleLogout = () => {
    api.logout();
    setCurrentUser(null);
    setProviderProfile(null);
    setActiveTab('services');
    setActiveCategoryPageView(null);
    showToast('Signed out successfully.');
  };

  // Handle Booking Creation Success
  const handleBookingSuccess = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);
    setActiveLiveTrackingBooking(newBooking);
    showToast(
      newBooking.isUrgent
        ? '⚡ SOS Order Confirmed! Emergency technician dispatched immediately.'
        : 'Service slot confirmed successfully!'
    );
  };

  // Compare Feature Handlers (Max 3 items)
  const handleToggleCompare = (service: ServiceItem) => {
    setCompareList((prev) => {
      const exists = prev.some((s) => s.id === service.id);
      if (exists) {
        return prev.filter((s) => s.id !== service.id);
      }
      if (prev.length >= 3) {
        showToast('Maximum 3 services can be compared at once.');
        return prev;
      }
      showToast(`Added "${service.title}" to compare (${prev.length + 1}/3)`);
      return [...prev, service];
    });
  };

  const handleRemoveFromCompare = (serviceId: string) => {
    setCompareList((prev) => prev.filter((s) => s.id !== serviceId));
  };

  const handleClearCompare = () => {
    setCompareList([]);
    setIsCompareModalOpen(false);
  };

  const handleAddToCompare = (service: ServiceItem) => {
    if (compareList.some((s) => s.id === service.id)) return;
    if (compareList.length >= 3) {
      showToast('Maximum 3 services can be compared at once.');
      return;
    }
    setCompareList((prev) => [...prev, service]);
    showToast(`Added "${service.title}" to compare (${compareList.length + 1}/3)`);
  };

  // Handle Cancel Booking
  const handleCancelBooking = async (bookingId: string) => {
    try {
      await api.updateBookingStatus(bookingId, 'CANCELLED');
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status: 'CANCELLED' } : b))
      );
      if (activeLiveTrackingBooking?.id === bookingId) {
        setActiveLiveTrackingBooking((prev) => (prev ? { ...prev, status: 'CANCELLED' } : null));
      }
      showToast('Booking cancelled successfully.');
    } catch (err: any) {
      showToast('Failed to cancel booking.');
    }
  };

  // Partner status update
  const handlePartnerUpdateStatus = async (bookingId: string, status: string) => {
    try {
      await api.updateBookingStatus(bookingId, status);
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status: status as any } : b))
      );
      showToast(`Job status updated to ${status}`);
    } catch (err: any) {
      showToast('Failed to update status.');
    }
  };

  const activeBookingsCount = bookings.filter(
    (b) => b.status !== 'COMPLETED' && b.status !== 'CANCELLED'
  ).length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white flex flex-col">
      {/* Offline Banner */}
      {isOffline && (
        <div className="bg-amber-600 text-white text-xs font-bold px-4 py-2 flex items-center justify-center gap-2 sticky top-0 z-50 shadow-md">
          <WifiOff className="w-4 h-4 animate-pulse shrink-0" />
          <span>You are offline. Showing cached UI for your existing authenticated session.</span>
        </div>
      )}

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-800 flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-bold">{toastMsg}</span>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        cities={cities}
        selectedCity={selectedCity}
        onSelectCity={setSelectedCity}
        selectedLocality={selectedLocality}
        onSelectLocality={setSelectedLocality}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        services={services}
        categories={categories}
        onSelectService={(srv) => {
          setSelectedServiceDetail(srv);
        }}
        onOpenAIDoctor={() => {
          setAiDoctorCategoryHint('');
          setIsAIDoctorOpen(true);
        }}
        onOpenAIChat={() => setIsAIChatOpen(true)}
        onOpenVoiceAssistant={() => {
          setVoiceFeedbackTargetBooking(null);
          setIsAIVoiceOpen(true);
        }}
        onOpenAPIDocs={() => setIsAPIDocsOpen(true)}
        activeBookingsCount={activeBookingsCount}
        onOpenBookings={() => {
          setDashboardDefaultTab('bookings');
          setActiveTab('dashboard');
        }}
        cartItemCount={cartItems.reduce((acc, it) => acc + it.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onAddToCart={handleAddToCart}
        onOpenReferAndEarn={() => {
          setDashboardDefaultTab('refer_earn');
          setActiveTab('dashboard');
        }}
        walletBalance={walletBalance}
        onQuickSOS={handleQuickSOS}
        currentUser={currentUser}
        providerProfile={providerProfile}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenAddresses={() => {
          if (!currentUser) setIsAuthOpen(true);
          else setIsAddressesOpen(true);
        }}
        onOpenProviderModal={() => setIsProviderModalOpen(true)}
        onOpenAdminModal={() => setIsAdminPanelOpen(true)}
        onLogout={handleLogout}
        onOpenHelpCenter={() => {
          setActiveCategoryPageView(null);
          setActiveTab('help');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenMyBookings={() => {
          setActiveCategoryPageView(null);
          setActiveTab('my_bookings');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateHome={() => {
          setActiveCategoryPageView(null);
          setActiveTab('services');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateServices={() => {
          setActiveCategoryPageView(null);
          setActiveTab('services');
          setTimeout(() => {
            document.getElementById('services-catalog-grid')?.scrollIntoView({ behavior: 'smooth' });
          }, 50);
        }}
      />

      {/* Main Content View */}
      {currentUser?.role === 'PROVIDER' ? (
        /* Service Provider View */
        <main className="flex-1 pb-24 md:pb-12">
          <PartnerDashboard
            partner={{
              id: providerProfile?.id || 'partner-101',
              name: currentUser.fullName,
              phone: currentUser.phone,
              avatar: currentUser.avatar || 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=300&q=80',
              categoryIds: [providerProfile?.categoryId || 'ac-appliance'],
              city: currentUser.city,
              rating: providerProfile?.rating || 4.92,
              totalJobs: providerProfile?.totalJobs || 1480,
              experienceYears: providerProfile?.experienceYears || 8,
              verified: providerProfile?.verified ?? true,
              skills: providerProfile?.skills || ['HVAC Certified', 'Short Circuit Specialist'],
              status: providerProfile?.availability || 'available',
              badge: providerProfile?.badge || 'Super Pro',
            }}
            bookings={bookings}
            onUpdateStatus={handlePartnerUpdateStatus}
            onViewInvoice={(booking) => setInvoiceBooking(booking)}
            onOpenDirections={(booking) => setDirectionsModalBooking(booking)}
          />
        </main>
      ) : activeTab === 'help' ? (
        /* Help Center View matching Video */
        <main className="flex-1 pb-24 md:pb-12">
          <HelpCenterView
            onBack={() => {
              setActiveTab('services');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            currentUser={currentUser}
            walletBalance={walletBalance}
            onOpenAddresses={() => setIsAddressesOpen(true)}
            onOpenMyBookings={() => {
              setActiveCategoryPageView(null);
              setActiveTab('my_bookings');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onExploreServices={() => {
              setActiveCategoryPageView(null);
              setActiveTab('services');
              setTimeout(() => {
                document.getElementById('services-catalog-grid')?.scrollIntoView({ behavior: 'smooth' });
              }, 50);
            }}
            onUpdateUserPhone={(newPhone) => {
              if (currentUser) {
                setCurrentUser({ ...currentUser, phoneNumber: newPhone });
                showToast('Phone number updated successfully.');
              }
            }}
            onUpdateUserEmail={(newEmail) => {
              if (currentUser) {
                setCurrentUser({ ...currentUser, email: newEmail });
                showToast('Email address updated successfully.');
              }
            }}
          />
        </main>
      ) : activeTab === 'my_bookings' ? (
        /* My Bookings View matching Video 2 */
        <main className="flex-1 pb-24 md:pb-12">
          <MyBookingsView
            bookings={bookings}
            onBack={() => {
              setActiveTab('services');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onExploreServices={() => {
              setActiveTab('services');
              setActiveCategoryPageView(null);
              setTimeout(() => {
                document.getElementById('services-catalog-grid')?.scrollIntoView({ behavior: 'smooth' });
              }, 50);
            }}
            onOpenHelp={() => {
              setActiveTab('help');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onTrackBooking={(booking) => setActiveLiveTrackingBooking(booking)}
            onOpenDirections={(booking) => setDirectionsModalBooking(booking)}
            onViewInvoice={(booking) => setInvoiceBooking(booking)}
            onOpenFeedback={(booking) => setFeedbackTargetBooking(booking)}
            onCancelBooking={handleCancelBooking}
            onRefreshBookings={refreshBookings}
          />
        </main>
      ) : activeTab === 'dashboard' ? (
        /* Customer Dashboard View */
        <main className="flex-1 pb-24 md:pb-12">
          <div className="bg-white border-b border-slate-200 px-4 sm:px-8 py-3">
            <button
              onClick={() => setActiveTab('services')}
              className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
            >
              ← Back to Service Catalog
            </button>
          </div>
          <UserDashboard
            bookings={bookings}
            walletBalance={walletBalance}
            defaultTab={dashboardDefaultTab}
            onWalletUpdated={(newBal) => setWalletBalance(newBal)}
            onTrackBooking={(booking) => setActiveLiveTrackingBooking(booking)}
            onOpenAIDoctor={() => setIsAIDoctorOpen(true)}
            onQuickSOS={handleQuickSOS}
            onOpenAddressManager={() => setIsAddressesOpen(true)}
            onOpenPostServiceFeedback={(booking) => setFeedbackTargetBooking(booking)}
            onViewInvoice={(booking) => setInvoiceBooking(booking)}
            onOpenDirections={(booking) => setDirectionsModalBooking(booking)}
            onCancelBooking={handleCancelBooking}
            onRefreshBookings={refreshBookings}
            onOpenVoiceFeedback={(booking) => {
              setVoiceFeedbackTargetBooking({
                id: booking.id,
                partnerId: booking.partner?.id,
                partnerName: booking.partner?.name,
                serviceTitle: booking.service.title,
              });
              setIsAIVoiceOpen(true);
            }}
          />
        </main>
      ) : activeCategoryPageView ? (
        /* Dedicated Category Service Page (with interactive video demonstration and sub-services) */
        <main className="flex-1 pb-24 md:pb-16">
          <CategoryPageView
            category={activeCategoryPageView}
            initialSubService={activeCategoryInitialSubService}
            allCategories={categories}
            services={services}
            cartItems={cartItems}
            onAddToCart={handleAddToCart}
            onUpdateCartQuantity={handleUpdateCartQuantity}
            onBookNow={(srv, isUrgent) => handleStartBooking(srv, isUrgent)}
            onSelectServiceDetail={(srv) => setSelectedServiceDetail(srv)}
            onClose={() => {
              setActiveCategoryPageView(null);
              setActiveCategoryInitialSubService(undefined);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectOtherCategory={(cat, subKey) => {
              setActiveCategoryPageView(cat);
              setActiveCategoryInitialSubService(subKey);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            selectedCityName={selectedCity.name}
            selectedLocality={selectedLocality}
          />
        </main>
      ) : (
        /* Customer Home & Service Catalog View */
        <main className="flex-1 pb-24 md:pb-16">
          <HeroSection
            selectedCityName={selectedCity.name}
            selectedLocality={selectedLocality}
            onSelectCategory={(catId) => {
              if (catId === 'salon') {
                handleOpenSalon();
                return;
              }
              setSelectedCategoryId(catId);
              setTimeout(() => {
                document.getElementById('services-catalog-grid')?.scrollIntoView({ behavior: 'smooth' });
              }, 50);
            }}
            onBookService={() => {
              document.getElementById('services-catalog-grid')?.scrollIntoView({ behavior: 'smooth' });
            }}
            onOpenAIDoctor={() => {
              setAiDoctorCategoryHint('');
              setIsAIDoctorOpen(true);
            }}
            onQuickSOS={handleQuickSOS}
          />

          {/* Trust & Statistics + "In the spotlight" Section */}
          <SpotlightSection
            onSelectCategory={(categoryId, subServiceKey) => {
              const cat = categories.find((c) => c.id === categoryId);
              if (cat) {
                setActiveCategoryInitialSubService(subServiceKey);
                setActiveCategoryPageView(cat);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            onExploreTopic={(topic) => {
              setSearchQuery(topic);
              setSelectedCategoryId('all');
              const el = document.getElementById('services-catalog-grid');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          {/* New and noteworthy Section (Directly after In the spotlight) */}
          <NewAndNoteworthySection
            onSelectService={(categoryId, subServiceKey) => {
              const cat = categories.find((c) => c.id === categoryId);
              if (cat) {
                setActiveCategoryInitialSubService(subServiceKey);
                setActiveCategoryPageView(cat);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          />

          {/* Most booked services (High Demand Area-Wise) - directly under New and noteworthy */}
          <MostBookedServicesSection
            selectedCity={selectedCity}
            selectedLocality={selectedLocality}
            onSelectLocality={(loc) => setSelectedLocality(loc)}
            onSelectService={(categoryId, subServiceKey) => {
              const cat = categories.find((c) => c.id === categoryId);
              if (cat) {
                setActiveCategoryInitialSubService(subServiceKey);
                setActiveCategoryPageView(cat);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            onOpenServiceDetail={(service) => setSelectedServiceDetail(service)}
            onAddToCart={handleAddToCart}
            onQuickBook={(service) => handleStartBooking(service, false)}
          />

          {/* Next homepage sections */}
          {/* Emergency SOS Section: "Need Help Right Now? 30-Min Express SOS" */}
          <EmergencySOSSection
            selectedCityName={selectedCity.name}
            selectedLocality={selectedLocality}
            onQuickSOS={(serviceHint) => {
              if (serviceHint) setAiDoctorCategoryHint(serviceHint);
              handleQuickSOS();
            }}
            onSelectServiceQuery={(query) => {
              setSearchQuery(query);
              setSelectedCategoryId('all');
              const el = document.getElementById('services-catalog-grid');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          {/* AI Features: AI Fault Diagnostic, AI Voice Assistant, Real-time Dispatch */}
          <AIFeaturesSection
            onOpenAIDoctor={() => {
              setAiDoctorCategoryHint('');
              setIsAIDoctorOpen(true);
            }}
            onOpenVoiceAssistant={() => {
              setVoiceFeedbackTargetBooking(null);
              setIsAIVoiceOpen(true);
            }}
            onQuickSOS={handleQuickSOS}
          />

          {/* All Services Categories (Screenshot format for all services, replacing old Available Packages) */}
          <div id="services-catalog-grid">
            <AllServicesCategorySections
              selectedLocality={selectedLocality}
              cityName={selectedCity.name}
              searchQuery={searchQuery}
              onClearSearch={() => setSearchQuery('')}
              onSelectCategory={(catId) => {
                if (catId === 'salon') {
                  handleOpenSalon();
                  return;
                }
                const cat = categories.find((c) => c.id === catId);
                if (cat) {
                  setActiveCategoryPageView(cat);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              onOpenServiceDetail={(service) => setSelectedServiceDetail(service)}
              onAddToCart={handleAddToCart}
            />
          </div>

          {/* How It Works Section */}
          <HowItWorksSection
            onBookService={() => {
              document.getElementById('services-catalog-grid')?.scrollIntoView({ behavior: 'smooth' });
            }}
            onQuickSOS={handleQuickSOS}
          />
        </main>
      )}

      {/* Modals & Floating Drawers */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={handleAuthSuccess}
        categories={categories}
      />

      {currentUser && (
        <AddressManagerModal
          isOpen={isAddressesOpen}
          onClose={() => setIsAddressesOpen(false)}
          user={currentUser}
          onAddressesUpdated={(updated) => setCurrentUser(updated)}
        />
      )}

      <AdminPanelModal
        isOpen={isAdminPanelOpen}
        onClose={() => setIsAdminPanelOpen(false)}
      />

      {currentUser && (
        <ProviderProfileModal
          isOpen={isProviderModalOpen}
          onClose={() => setIsProviderModalOpen(false)}
          user={currentUser}
          providerProfile={providerProfile}
          categories={categories}
          onProviderProfileUpdated={(updated) => setProviderProfile(updated)}
        />
      )}

      <ServiceDetailModal
        service={selectedServiceDetail}
        onClose={() => setSelectedServiceDetail(null)}
        isComparing={selectedServiceDetail ? compareList.some((c) => c.id === selectedServiceDetail.id) : false}
        onToggleCompare={handleToggleCompare}
        cartItems={cartItems}
        onAddToCart={handleAddToCart}
        onUpdateCartQuantity={handleUpdateCartQuantity}
        onProceedBooking={(s, isUrgent) => {
          setSelectedServiceDetail(null);
          setBookingServiceTarget(s);
          setBookingIsUrgent(isUrgent);
          setAiDiagnosisForBooking(null);
          setIsBookingWizardOpen(true);
        }}
        onOpenAIDoctorForCategory={(categoryName) => {
          setAiDoctorCategoryHint(categoryName);
          setIsAIDoctorOpen(true);
        }}
      />

      <AIDiagnosticModal
        isOpen={isAIDoctorOpen}
        onClose={() => setIsAIDoctorOpen(false)}
        categoryHint={aiDoctorCategoryHint}
        onBookDiagnosis={handleBookFromDiagnosis}
      />

      <BookingWizardModal
        isOpen={isBookingWizardOpen}
        onClose={() => setIsBookingWizardOpen(false)}
        service={bookingServiceTarget}
        isUrgentDefault={bookingIsUrgent}
        aiDiagnosis={aiDiagnosisForBooking}
        selectedCity={selectedCity}
        selectedLocality={selectedLocality}
        onBookingSuccess={handleBookingSuccess}
      />

      <LiveTrackingModal
        booking={activeLiveTrackingBooking}
        onClose={() => setActiveLiveTrackingBooking(null)}
        onCancelBooking={handleCancelBooking}
        onOpenPostServiceFeedback={(b) => setFeedbackTargetBooking(b)}
        onViewInvoice={(b) => setInvoiceBooking(b)}
        onOpenDirections={(b) => setDirectionsModalBooking(b)}
        onBookingUpdated={(updated) => {
          setBookings((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
          setActiveLiveTrackingBooking(updated);
          showToast(`💵 Cash payment of ₹${updated.totalAmount} recorded. GST Invoice generated!`);
        }}
      />

      {/* One-Click Directions & Turn-by-Turn Route Navigation Modal */}
      <DirectionsModal
        isOpen={Boolean(directionsModalBooking)}
        onClose={() => setDirectionsModalBooking(null)}
        booking={directionsModalBooking}
        viewerRole={currentUser?.role === 'PROVIDER' ? 'PROVIDER' : 'CUSTOMER'}
      />

      {/* Real-time Push Notification Floating Interactive Toast */}
      <PushNotificationToast
        onOpenBooking={(id) => {
          const matched = bookings.find((b) => b.id === id);
          if (matched) setActiveLiveTrackingBooking(matched);
        }}
        onOpenDirections={(id) => {
          const matched = bookings.find((b) => b.id === id);
          if (matched) setDirectionsModalBooking(matched);
        }}
      />

      {/* Push Notification Center & 1-Hour Alerts Hub Modal */}
      <NotificationCenterModal
        isOpen={isNotificationCenterOpen}
        onClose={() => setIsNotificationCenterOpen(false)}
        notifications={notifications}
        onMarkRead={handleMarkNotificationRead}
        bookings={bookings}
        viewerRole={currentUser?.role === 'PROVIDER' ? 'PROVIDER' : 'CUSTOMER'}
        onOpenBooking={(id) => {
          setIsNotificationCenterOpen(false);
          const matched = bookings.find((b) => b.id === id);
          if (matched) setActiveLiveTrackingBooking(matched);
        }}
        onOpenDirections={(booking) => {
          setIsNotificationCenterOpen(false);
          setDirectionsModalBooking(booking);
        }}
      />

      <InvoiceModal
        isOpen={!!invoiceBooking}
        onClose={() => setInvoiceBooking(null)}
        booking={invoiceBooking}
        user={currentUser}
      />

      <PostServiceFeedbackModal
        isOpen={!!feedbackTargetBooking}
        booking={feedbackTargetBooking}
        onClose={() => setFeedbackTargetBooking(null)}
        onOpenVoiceAssistant={() => {
          if (feedbackTargetBooking) {
            setVoiceFeedbackTargetBooking({
              id: feedbackTargetBooking.id,
              partnerId: feedbackTargetBooking.partnerId,
              partnerName: feedbackTargetBooking.partner?.name,
              serviceTitle: feedbackTargetBooking.service.title,
            });
            setFeedbackTargetBooking(null);
            setIsAIVoiceOpen(true);
          }
        }}
        onSubmitFeedback={(feedback) => {
          setBookings((prev) =>
            prev.map((b) =>
              b.id === feedback.bookingId
                ? {
                    ...b,
                    userStarRating: feedback.rating,
                    userReviewText: feedback.reviewText,
                    workPhotos: feedback.workPhotos,
                  }
                : b
            )
          );
          showToast('🌟 Thank you! Feedback, photos & rating submitted successfully.');
        }}
      />

      <AIChatDrawer
        isOpen={isAIChatOpen}
        onClose={() => setIsAIChatOpen(false)}
        onBookService={(serviceId, isUrgent) => {
          const srv = services.find((s) => s.id === serviceId) || services[0];
          setBookingServiceTarget(srv);
          setBookingIsUrgent(!!isUrgent);
          setAiDiagnosisForBooking(null);
          setIsBookingWizardOpen(true);
        }}
        onOpenVoiceAssistant={() => setIsAIVoiceOpen(true)}
      />

      <AIVoiceAssistantModal
        isOpen={isAIVoiceOpen}
        onClose={() => {
          setIsAIVoiceOpen(false);
          setVoiceFeedbackTargetBooking(null);
        }}
        bookingForVoiceFeedback={voiceFeedbackTargetBooking}
        onFeedbackSubmitted={({ bookingId, voiceFeedbackText, sentiment, rating, summary }) => {
          setBookings((prev) =>
            prev.map((b) =>
              b.id === bookingId
                ? {
                    ...b,
                    voiceFeedbackText,
                    voiceFeedbackSentiment: sentiment as any,
                    voiceFeedbackRating: rating,
                    voiceFeedbackSummary: summary,
                    voiceFeedbackAt: new Date().toISOString(),
                  }
                : b
            )
          );
        }}
        onBookService={(serviceId) => {
          const srv = services.find((s) => s.id === serviceId) || services[0];
          setBookingServiceTarget(srv);
          setBookingIsUrgent(false);
          setAiDiagnosisForBooking(null);
          setIsBookingWizardOpen(true);
        }}
      />

      <APIDocsModal
        isOpen={isAPIDocsOpen}
        onClose={() => setIsAPIDocsOpen(false)}
      />

      {/* Salon Derma Modal (Prime vs Luxe Selection from Video) */}
      <SalonDermaModal
        isOpen={isSalonDermaModalOpen}
        onClose={() => setIsSalonDermaModalOpen(false)}
        onSelectTier={(tier) => {
          setIsSalonDermaModalOpen(false);
          const salonCat = categories.find((c) => c.id === 'salon');
          if (salonCat) {
            setActiveCategoryInitialSubService(tier);
            setActiveCategoryPageView(salonCat);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
      />

      {/* Services Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onCheckout={handleCheckoutCart}
        onBrowseServices={() => {
          setIsCartOpen(false);
          document.getElementById('services-catalog-grid')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Compare Services Side-by-Side Modal */}
      <CompareServicesModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        compareList={compareList}
        allServices={services}
        onRemoveService={handleRemoveFromCompare}
        onAddService={handleAddToCompare}
        onBookService={(service, isUrgent) => {
          setBookingServiceTarget(service);
          setBookingIsUrgent(isUrgent);
          setAiDiagnosisForBooking(null);
          setIsBookingWizardOpen(true);
        }}
      />

      {/* Floating Compare Drawer Bar */}
      <CompareFloatingBar
        compareList={compareList}
        onRemoveFromCompare={handleRemoveFromCompare}
        onClearCompare={handleClearCompare}
        onOpenCompareModal={() => setIsCompareModalOpen(true)}
      />

      {/* Left Corner Floating AI Assistant & Voice Assistant */}
      <FloatingAIAssistant
        onOpenAIChat={() => setIsAIChatOpen(true)}
        onOpenAIVoice={() => {
          setVoiceFeedbackTargetBooking(null);
          setIsAIVoiceOpen(true);
        }}
        onOpenAIDoctor={() => {
          setAiDoctorCategoryHint('');
          setIsAIDoctorOpen(true);
        }}
      />

      {/* Mobile Bottom Navigation Bar (Visible on mobile/tablet screens) */}
      <MobileBottomNav
        activeTab={activeTab}
        dashboardTab={dashboardDefaultTab}
        activeBookingsCount={activeBookingsCount}
        onNavigateHome={() => {
          setActiveCategoryPageView(null);
          setActiveTab('services');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateBookings={() => {
          setActiveCategoryPageView(null);
          setActiveTab('my_bookings');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateReferEarn={() => {
          setDashboardDefaultTab('refer_earn');
          setActiveTab('dashboard');
        }}
        onQuickSOS={handleQuickSOS}
        onOpenAIAssistant={() => setIsAIChatOpen(true)}
        cartItemCount={cartItems.reduce((acc, it) => acc + it.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Website Footer matching Urban Company / UrgentLyfe specification */}
      <Footer
        onOpenProviderModal={() => setIsProviderModalOpen(true)}
        onNavigateCategories={() => {
          setActiveCategoryPageView(null);
          setActiveTab('services');
          setTimeout(() => {
            document.getElementById('services-catalog-grid')?.scrollIntoView({ behavior: 'smooth' });
          }, 50);
        }}
        selectedCityName={selectedCity.name}
        selectedLocality={selectedLocality}
      />
    </div>
  );
}
