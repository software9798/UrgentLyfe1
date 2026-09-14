import React, { useState } from 'react';
import {
  ArrowLeft,
  User,
  Compass,
  CreditCard,
  Crown,
  ShieldCheck,
  Award,
  ChevronRight,
  ThumbsUp,
  ThumbsDown,
  CheckCircle2,
  X,
  Phone,
  Mail,
  Zap,
} from 'lucide-react';
import { User as UserType } from '../../types';

export interface HelpArticle {
  id: string;
  title: string;
  section?: string; // Optional section grouping e.g. 'About us', 'Booking', 'Purchase', 'Modifications', 'Warranty'
  content: string[];
  ctaLabel?: string;
  ctaAction?: 'change_phone' | 'my_addresses' | 'change_email' | 'check_payment' | 'my_bookings' | 'explore_services';
}

export interface HelpTopic {
  id: string;
  title: string;
  headerTitle?: string; // Displayed on the topic questions list page
  icon: React.ComponentType<{ className?: string }>;
  directArticle?: boolean; // If true, tapping opens the article directly (like Safety)
  articles: HelpArticle[];
}

interface HelpCenterViewProps {
  onBack: () => void;
  currentUser?: UserType | null;
  onOpenAddresses?: () => void;
  onOpenMyBookings?: () => void;
  onExploreServices?: () => void;
  walletBalance?: number;
  onUpdateUserPhone?: (newPhone: string) => void;
  onUpdateUserEmail?: (newEmail: string) => void;
}

const HELP_DATA: HelpTopic[] = [
  {
    id: 'account',
    title: 'Account',
    headerTitle: 'Account',
    icon: User,
    articles: [
      {
        id: 'change-phone',
        title: 'I want to change my phone number',
        content: [
          'You can change your phone number from the profile section after verifying it with an OTP.',
        ],
        ctaLabel: 'Change phone number',
        ctaAction: 'change_phone',
      },
      {
        id: 'check-addresses',
        title: 'Where can I check my saved addresses?',
        content: [
          'You can check your saved addresses using the following ways:',
          '1. While selecting the location from the app homescreen',
          '2. Check address on the check out screen before making payment',
          'Alternatively, you can click on the below link to check all your addresses.',
        ],
        ctaLabel: 'My addresses',
        ctaAction: 'my_addresses',
      },
      {
        id: 'change-email',
        title: 'I want to change my email address',
        content: [
          'You can change your email address from the profile section after verifying with an OTP.',
        ],
        ctaLabel: 'Change email address',
        ctaAction: 'change_email',
      },
      {
        id: 'saved-payment-details',
        title: 'Where can I see my saved payment details?',
        content: [
          'You can check all your saved payment details by clicking the below button.',
          'If you wish to remove any payment details, you can either unlink wallet account or Delete card details.',
        ],
        ctaLabel: 'Check saved payment',
        ctaAction: 'check_payment',
      },
    ],
  },
  {
    id: 'getting-started',
    title: 'Getting started with UrgentLyfe',
    headerTitle: 'Getting started with UrgentLyfe',
    icon: Compass,
    articles: [
      {
        id: 'what-is-urgentlyfe',
        section: 'About us',
        title: 'What is UrgentLyfe?',
        content: [
          'UrgentLyfe is India’s premier on-demand home services and 30-minute express SOS repair marketplace.',
          'We connect home owners with certified, background-verified professionals across appliance care, electrical repairs, plumbing emergencies, professional cleaning, and salon at home.',
          'We currently operate in top cities including Delhi NCR, Mumbai, Bengaluru, Hyderabad, Chennai, Pune, Kolkata, and Ahmedabad.',
        ],
        ctaLabel: 'Explore services',
        ctaAction: 'explore_services',
      },
      {
        id: 'how-to-place-booking',
        section: 'Booking',
        title: 'How to place a booking?',
        content: [
          'You can follow the steps below to book a service on our app:',
          '1. Search for the service on the home screen or choose the category you want',
          '2. Specify the quantity and review upfront transparent rate-card pricing',
          '3. Choose your preferred time slot or tap 30-Min Express SOS for immediate dispatch',
          '4. Once confirmed, a verified professional will be assigned prior to your booking time',
          '5. The professional will reach your address at the scheduled time and complete the service with quality assurance.',
        ],
        ctaLabel: 'Explore services',
        ctaAction: 'explore_services',
      },
      {
        id: 'can-i-rebook-same-pro',
        section: 'Booking',
        title: 'Can I re-book the same professional if I like their service?',
        content: [
          'Yes, if you liked your service with the professional, you will get an option to re-book with the same professional the next time you book. Click on their profile in your past bookings and easily re-book them.',
        ],
        ctaLabel: 'My bookings',
        ctaAction: 'my_bookings',
      },
      {
        id: 'how-to-book-preferred-pro',
        section: 'Booking',
        title: 'How to book my preferred professional?',
        content: [
          'If you want to re-book a professional you previously booked with:',
          '1. Add services to your cart',
          '2. Select your preferred professional from the list of professionals available while placing the booking',
          '3. If the date of your preferred professional is not available, please proceed with placing the booking and we will assign the next preferred professional available. All our professionals are trained to deliver a high-quality experience.',
        ],
        ctaLabel: 'My bookings',
        ctaAction: 'my_bookings',
      },
      {
        id: 'minimum-order-value',
        section: 'Booking',
        title: 'Do I need to order a minimum value of services before I can place the booking?',
        content: [
          'No, there is no strict minimum order value for placing a booking on UrgentLyfe. Standard consultation or diagnosis visits start from as low as ₹149 with complete pricing transparency.',
        ],
        ctaLabel: 'Explore services',
        ctaAction: 'explore_services',
      },
      {
        id: 'cancellation-fee',
        section: 'Booking',
        title: 'Does UrgentLyfe charge any cancellation fee?',
        content: [
          'Cancellation fees are charged only if a professional is assigned for your booking and the cancellation is done closer to your booking time. This is done to fairly compensate the professionals for their time and the cost incurred while travelling to your place.',
          'The exact amount will be shown when you request a cancellation.',
        ],
        ctaLabel: 'My bookings',
        ctaAction: 'my_bookings',
      },
    ],
  },
  {
    id: 'payments',
    title: 'Payment & UrgentLyfe Credits',
    headerTitle: 'Payment & UrgentLyfe Credits',
    icon: CreditCard,
    articles: [
      {
        id: 'unable-to-pay',
        title: 'I am unable to make payment',
        content: [
          'If you are still unable to complete payment, please try the following steps:',
          '1. Try a different payment mode than the one you\'re trying right now (e.g. UPI, NetBanking, Debit/Credit Card, or Cash on Delivery)',
          '2. In case the amount was deducted from your account, select "I have paid, check status" on the payment screen. We will verify and update the status within 5-10 minutes.',
          '3. If payment failed and was deducted, please wait 3 business days for it to be refunded back to your account or credited to your UrgentLyfe Wallet.',
        ],
        ctaLabel: 'Check saved payment',
        ctaAction: 'check_payment',
      },
      {
        id: 'check-wallet-balance',
        title: 'How do I check my wallet balance?',
        content: [
          'You can check your available UrgentLyfe Wallet balance at the top of your Account screen or during checkout. Wallet credits are automatically applied towards your active booking invoice.',
        ],
        ctaLabel: 'Check saved payment',
        ctaAction: 'check_payment',
      },
      {
        id: 'how-to-use-credits',
        title: 'How can I use UrgentLyfe credits?',
        content: [
          'UrgentLyfe credits are automatically deducted from your total payable amount on the checkout screen. Any remaining balance can be settled via UPI, credit/debit card, or cash on delivery.',
        ],
        ctaLabel: 'Explore services',
        ctaAction: 'explore_services',
      },
      {
        id: 'reduce-reward-validity',
        title: 'Can I reduce the validity of the reward?',
        content: [
          'Reward promotional validity dates are fixed based on seasonal campaigns and coupons. Validity terms cannot be customized or reduced manually.',
        ],
      },
      {
        id: 'how-referral-works',
        title: 'How does referral work?',
        content: [
          'Share your referral link or code with friends and colleagues. When your referred friend completes their first service booking, they receive ₹100 instant discount and you receive ₹100 in UrgentLyfe wallet credits.',
        ],
        ctaLabel: 'Check saved payment',
        ctaAction: 'check_payment',
      },
      {
        id: 'missing-referral-reward',
        title: 'I have not received a reward for referral',
        content: [
          'Referral rewards are credited once your referee\'s service is successfully finished and marked as completed. If it has been over 24 hours since completion, please verify your wallet transaction logs or reach out to our 24/7 support desk.',
        ],
        ctaLabel: 'Check saved payment',
        ctaAction: 'check_payment',
      },
      {
        id: 'where-saved-payment-details',
        title: 'Where can I see my saved payment details?',
        content: [
          'You can check all your saved payment details by clicking the below button.',
          'If you wish to remove any payment details, you can either unlink wallet account or Delete card details.',
        ],
        ctaLabel: 'Check saved payment',
        ctaAction: 'check_payment',
      },
      {
        id: 'pay-later-charges',
        title: 'Will I be charged extra if I choose to pay later?',
        content: [
          'No. Cash on Delivery (COD) and pay-after-service options do not carry any additional convenience charges or hidden fees.',
        ],
      },
    ],
  },
  {
    id: 'plus-membership',
    title: 'UrgentLyfe Plus membership',
    headerTitle: 'UrgentLyfe Plus membership',
    icon: Crown,
    articles: [
      {
        id: 'membership-benefits',
        section: 'Purchase',
        title: 'What are the benefits of the membership?',
        content: [
          'UrgentLyfe Plus membership comes with a range of benefits that are designed for you:',
          '1. 10% discount on all our services (home repairs, cleaning, appliance care, and salon)',
          '2. Free unlimited diagnostic and inspection visits with verified technicians',
          '3. Priority emergency dispatch for 30-minute SOS callouts',
          '4. Zero cancellation charges at all times.',
        ],
        ctaLabel: 'Explore services',
        ctaAction: 'explore_services',
      },
      {
        id: 'max-discount-plus',
        section: 'Purchase',
        title: 'What is the maximum discount that I can get by using UrgentLyfe Plus?',
        content: [
          'You can save up to ₹1,000 per booking with your 10% membership discount, with unlimited annual savings across all service categories.',
        ],
      },
      {
        id: 'how-to-buy-membership',
        section: 'Purchase',
        title: 'How do I buy the membership?',
        content: [
          'You can add UrgentLyfe Plus membership directly to your cart during checkout to apply instant 10% savings on your current order, or activate it from your profile.',
        ],
        ctaLabel: 'Explore services',
        ctaAction: 'explore_services',
      },
      {
        id: 'pay-plus-cod',
        section: 'Purchase',
        title: 'Can I pay for membership with cash on delivery?',
        content: [
          'No, the membership can only be activated when payment is made online.',
          'Since membership provides an immediate discount on your active cart, it must be settled via online payment at the time of checkout.',
        ],
      },
      {
        id: 'share-plus-family',
        section: 'Purchase',
        title: 'Can I share membership with family?',
        content: [
          'Yes, your Plus membership benefits apply across all saved addresses registered in your account, so your entire household can enjoy zero inspection charges and 10% discounts.',
        ],
      },
      {
        id: 'categories-excluded-plus',
        section: 'Purchase',
        title: 'Are any categories not included in Plus membership?',
        content: [
          'All major categories—including AC repair, electrical, plumbing, carpentry, cleaning, pest control, and salon—are fully covered by Plus benefits.',
        ],
      },
      {
        id: 'cancel-plus-plan',
        section: 'Modifications',
        title: 'How do I cancel my membership plan?',
        content: [
          'You can cancel your membership renewal from your profile settings anytime. If you have not utilized any Plus discounts within the first 14 days, a 100% refund is processed back to your original payment mode.',
        ],
      },
      {
        id: 'pause-membership',
        section: 'Modifications',
        title: 'Can I pause my membership?',
        content: [
          'Yes, you can pause your membership for up to 60 days if you are travelling. Your remaining days of validity will be preserved until you resume.',
        ],
      },
    ],
  },
  {
    id: 'safety',
    title: 'UrgentLyfe Safety',
    headerTitle: 'UrgentLyfe Safety',
    icon: ShieldCheck,
    directArticle: true,
    articles: [
      {
        id: 'safety-measures',
        title: 'Know more about UrgentLyfe\'s safety measures',
        content: [
          'At UrgentLyfe, the safety of customers and professionals is taken extremely seriously. To ensure this we have taken the following comprehensive steps:',
          '1. 100% verified background checks (5-tier police verification, ID check, and trade credential validation)',
          '2. ₹10,000 property protection insurance covering accidental damages during any service execution',
          '3. 24/7 Rapid SOS safety button with emergency dispatch and live coordinate sharing',
          '4. Standardized safety gear, hygiene protocols, and continuous quality audits on every service visit.',
        ],
        ctaLabel: 'Explore services',
        ctaAction: 'explore_services',
      },
    ],
  },
  {
    id: 'warranty',
    title: 'Claim Warranty',
    headerTitle: 'Warranty',
    icon: Award,
    articles: [
      {
        id: 'warranty-covered-services',
        section: 'Warranty',
        title: 'Which services are covered under UrgentLyfe warranty?',
        content: [
          'All repair and installation services across AC servicing, plumbing, electrical fixtures, and appliance repair include our standard 30-Day UrgentLyfe Rework Warranty.',
          'Any genuine replacement parts procured through our certified professionals are backed by manufacturer warranty.',
        ],
        ctaLabel: 'My bookings',
        ctaAction: 'my_bookings',
      },
      {
        id: 'pay-under-warranty',
        section: 'Warranty',
        title: 'Do I have to pay for the service under warranty?',
        content: [
          'No. If an issue recurs within the 30-day warranty period, our verified technician will revisit your doorstep and resolve the problem at zero additional inspection or labor cost.',
        ],
        ctaLabel: 'My bookings',
        ctaAction: 'my_bookings',
      },
    ],
  },
];

export const HelpCenterView: React.FC<HelpCenterViewProps> = ({
  onBack,
  currentUser,
  onOpenAddresses,
  onOpenMyBookings,
  onExploreServices,
  walletBalance = 1250,
  onUpdateUserPhone,
  onUpdateUserEmail,
}) => {
  // Navigation states: null -> All topics; topic -> Questions list; article -> Article detail
  const [selectedTopic, setSelectedTopic] = useState<HelpTopic | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<HelpArticle | null>(null);

  // Feedback State per article (👍 / 👎)
  const [feedbackState, setFeedbackState] = useState<{ [articleId: string]: 'yes' | 'no' }>({});

  // Interactive Modals
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [newPhoneInput, setNewPhoneInput] = useState(currentUser?.phoneNumber || '');
  const [phoneOtpStep, setPhoneOtpStep] = useState<'input' | 'otp' | 'success'>('input');
  const [phoneOtpValue, setPhoneOtpValue] = useState('');

  const [showEmailModal, setShowEmailModal] = useState(false);
  const [newEmailInput, setNewEmailInput] = useState(currentUser?.email || '');
  const [emailOtpStep, setEmailOtpStep] = useState<'input' | 'otp' | 'success'>('input');
  const [emailOtpValue, setEmailOtpValue] = useState('');

  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Back Navigation matching video hierarchy
  const handleBack = () => {
    if (selectedArticle) {
      if (selectedTopic?.directArticle) {
        // If topic was opened directly as an article, back takes you to All topics
        setSelectedArticle(null);
        setSelectedTopic(null);
      } else {
        // Step down from Article Detail -> Topic Questions List
        setSelectedArticle(null);
      }
    } else if (selectedTopic) {
      // Step down from Topic Questions List -> All topics
      setSelectedTopic(null);
    } else {
      // Return to Homescreen
      onBack();
    }
  };

  // Handle Topic Click
  const handleSelectTopic = (topic: HelpTopic) => {
    setSelectedTopic(topic);
    if (topic.directArticle && topic.articles.length > 0) {
      // Like "UC Safety" in video at 00:36, goes straight to article
      setSelectedArticle(topic.articles[0]);
    } else {
      setSelectedArticle(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle CTA Button in Article
  const handleCtaClick = (action?: string) => {
    if (!action) return;
    switch (action) {
      case 'change_phone':
        setPhoneOtpStep('input');
        setNewPhoneInput(currentUser?.phoneNumber || '');
        setPhoneOtpValue('');
        setShowPhoneModal(true);
        break;
      case 'my_addresses':
        if (onOpenAddresses) {
          onOpenAddresses();
        }
        break;
      case 'change_email':
        setEmailOtpStep('input');
        setNewEmailInput(currentUser?.email || '');
        setEmailOtpValue('');
        setShowEmailModal(true);
        break;
      case 'check_payment':
        setShowPaymentModal(true);
        break;
      case 'my_bookings':
        if (onOpenMyBookings) {
          onOpenMyBookings();
        }
        break;
      case 'explore_services':
        if (onExploreServices) {
          onExploreServices();
        }
        break;
      default:
        break;
    }
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneOtpStep === 'input') {
      if (newPhoneInput.replace(/\D/g, '').length >= 10) {
        setPhoneOtpStep('otp');
      }
    } else if (phoneOtpStep === 'otp') {
      if (phoneOtpValue.length >= 4) {
        setPhoneOtpStep('success');
        if (onUpdateUserPhone) {
          onUpdateUserPhone(newPhoneInput);
        }
        setTimeout(() => {
          setShowPhoneModal(false);
        }, 1500);
      }
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailOtpStep === 'input') {
      if (newEmailInput.includes('@')) {
        setEmailOtpStep('otp');
      }
    } else if (emailOtpStep === 'otp') {
      if (emailOtpValue.length >= 4) {
        setEmailOtpStep('success');
        if (onUpdateUserEmail) {
          onUpdateUserEmail(newEmailInput);
        }
        setTimeout(() => {
          setShowEmailModal(false);
        }, 1500);
      }
    }
  };

  // Helper to group articles by section
  const groupArticlesBySection = (articles: HelpArticle[]) => {
    const groups: { [key: string]: HelpArticle[] } = {};
    const defaultSectionKey = '__none__';

    articles.forEach((art) => {
      const sec = art.section || defaultSectionKey;
      if (!groups[sec]) {
        groups[sec] = [];
      }
      groups[sec].push(art);
    });

    return groups;
  };

  return (
    <div id="help-center-screen" className="min-h-screen bg-white">
      {/* Top Header Bar matching Video exactly: "← Help" */}
      <div className="sticky top-0 z-30 bg-white border-b border-slate-100 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-2xs">
        <button
          id="help-back-btn"
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-slate-900 hover:text-[#6b21a8] font-bold text-sm sm:text-base cursor-pointer transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 text-slate-800 group-hover:-translate-x-1 transition-transform" />
          <span>Help</span>
        </button>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* =========================================================================
            LEVEL 3: ARTICLE DETAIL VIEW (Matches Video 00:01, 00:04, 00:06, 00:08, 00:11, 00:19, 00:28, 00:31, 00:36)
           ========================================================================= */}
        {selectedArticle ? (
          <div className="animate-in fade-in duration-150">
            {/* Title matching video: Large bold headline */}
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-4 leading-snug">
              {selectedArticle.title}
            </h1>

            {/* Body Content */}
            <div className="text-sm text-slate-600 leading-relaxed space-y-3 mb-6 font-normal">
              {selectedArticle.content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Action Button: Purple pill button if applicable */}
            {selectedArticle.ctaLabel && (
              <div className="mb-8">
                <button
                  type="button"
                  id={`help-cta-${selectedArticle.id}`}
                  onClick={() => handleCtaClick(selectedArticle.ctaAction)}
                  className="px-6 py-2.5 bg-[#6b21a8] hover:bg-[#581c87] text-white text-sm font-semibold rounded-xl shadow-xs transition-colors cursor-pointer active:scale-98"
                >
                  {selectedArticle.ctaLabel}
                </button>
              </div>
            )}

            {/* Helpful feedback section (Matches Video 👍 👎) */}
            <div className="pt-6 border-t border-slate-100">
              <p className="text-xs text-slate-500 mb-3">Was this article helpful?</p>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() =>
                    setFeedbackState((prev) => ({ ...prev, [selectedArticle.id]: 'yes' }))
                  }
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border text-xs font-medium cursor-pointer transition-all ${
                    feedbackState[selectedArticle.id] === 'yes'
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Yes</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setFeedbackState((prev) => ({ ...prev, [selectedArticle.id]: 'no' }))
                  }
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border text-xs font-medium cursor-pointer transition-all ${
                    feedbackState[selectedArticle.id] === 'no'
                      ? 'border-slate-400 bg-slate-100 text-slate-700'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <ThumbsDown className="w-3.5 h-3.5" />
                  <span>No</span>
                </button>

                {feedbackState[selectedArticle.id] && (
                  <span className="text-xs text-emerald-600 font-medium animate-in fade-in">
                    Thank you for your feedback!
                  </span>
                )}
              </div>
            </div>
          </div>
        ) : selectedTopic ? (
          /* =========================================================================
              LEVEL 2: TOPIC QUESTIONS LIST (Matches Video 00:00, 00:02, 00:17, 00:25, 00:38)
             ========================================================================= */
          <div className="animate-in fade-in duration-150">
            {/* Heading matching video: e.g. "Getting started with UrgentLyfe", "Payment & UrgentLyfe Credits", "UrgentLyfe Plus membership" */}
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-4">
              {selectedTopic.headerTitle || selectedTopic.title}
            </h1>

            {/* List with red/maroon subheadings matching video sections */}
            {(() => {
              const grouped = groupArticlesBySection(selectedTopic.articles);
              const sectionKeys = Object.keys(grouped);

              return (
                <div className="space-y-6">
                  {sectionKeys.map((secName) => {
                    const arts = grouped[secName];
                    return (
                      <div key={secName}>
                        {secName !== '__none__' && (
                          <h2 className="text-xs sm:text-sm font-semibold text-[#991b1b] tracking-wide mb-1 pt-2">
                            {secName}
                          </h2>
                        )}
                        <div className="divide-y divide-slate-100">
                          {arts.map((article) => (
                            <button
                              key={article.id}
                              type="button"
                              id={`article-item-${article.id}`}
                              onClick={() => {
                                setSelectedArticle(article);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                              className="w-full py-3.5 px-1 flex items-center justify-between text-left hover:text-[#6b21a8] transition-colors cursor-pointer group"
                            >
                              <span className="text-sm font-normal text-slate-800 group-hover:text-slate-950 pr-4">
                                {article.title}
                              </span>
                              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </div>
        ) : (
          /* =========================================================================
              LEVEL 1: ALL TOPICS LIST (Matches Video 00:15, 00:23, 00:34, 00:41)
             ========================================================================= */
          <div className="animate-in fade-in duration-150">
            {/* Title matching video: "All topics" */}
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-4">
              All topics
            </h1>

            {/* Clean list of topics with icons and right chevron ">" */}
            <div className="divide-y divide-slate-100">
              {HELP_DATA.map((topic) => {
                const Icon = topic.icon;
                return (
                  <button
                    key={topic.id}
                    type="button"
                    id={`topic-item-${topic.id}`}
                    onClick={() => handleSelectTopic(topic)}
                    className="w-full py-4 px-1 flex items-center justify-between text-left hover:bg-slate-50/60 rounded-xl transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-500 group-hover:text-slate-800">
                        <Icon className="w-5 h-5 stroke-[1.75]" />
                      </div>
                      <span className="text-sm font-medium text-slate-800 group-hover:text-slate-950">
                        {topic.title}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* =========================================================================
          INTERACTIVE MODAL: Change Phone Number
         ========================================================================= */}
      {showPhoneModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4 relative">
            <button
              type="button"
              onClick={() => setShowPhoneModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>

            {phoneOtpStep === 'input' && (
              <form onSubmit={handlePhoneSubmit} className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Change Phone Number</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Enter your new mobile number. We will send a one-time verification OTP.
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mobile Number
                  </label>
                  <div className="flex items-center border border-slate-300 rounded-xl px-3 py-2">
                    <span className="text-xs font-bold text-slate-500 mr-2">+91</span>
                    <input
                      type="tel"
                      value={newPhoneInput}
                      onChange={(e) => setNewPhoneInput(e.target.value)}
                      placeholder="9876543210"
                      maxLength={10}
                      className="w-full text-xs font-bold text-slate-900 focus:outline-none"
                      autoFocus
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#6b21a8] hover:bg-[#581c87] text-white text-xs font-bold rounded-xl cursor-pointer"
                >
                  Send OTP
                </button>
              </form>
            )}

            {phoneOtpStep === 'otp' && (
              <form onSubmit={handlePhoneSubmit} className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Enter OTP</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Enter the 4-digit code sent to +91 {newPhoneInput}.
                  </p>
                </div>
                <div>
                  <input
                    type="text"
                    value={phoneOtpValue}
                    onChange={(e) => setPhoneOtpValue(e.target.value)}
                    placeholder="1234"
                    maxLength={4}
                    className="w-full text-center tracking-widest text-lg font-black border border-slate-300 rounded-xl py-2 focus:outline-none focus:border-indigo-600"
                    autoFocus
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#6b21a8] hover:bg-[#581c87] text-white text-xs font-bold rounded-xl cursor-pointer"
                >
                  Verify & Update
                </button>
              </form>
            )}

            {phoneOtpStep === 'success' && (
              <div className="text-center py-4 space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto animate-bounce" />
                <h3 className="text-sm font-bold text-slate-900">Phone Number Updated!</h3>
                <p className="text-xs text-slate-500">Your profile has been updated successfully.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          INTERACTIVE MODAL: Change Email Address
         ========================================================================= */}
      {showEmailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4 relative">
            <button
              type="button"
              onClick={() => setShowEmailModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>

            {emailOtpStep === 'input' && (
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Change Email Address</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Enter your new email address. We will verify it via a confirmation code.
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={newEmailInput}
                    onChange={(e) => setNewEmailInput(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full text-xs font-bold text-slate-900 border border-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-600"
                    autoFocus
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#6b21a8] hover:bg-[#581c87] text-white text-xs font-bold rounded-xl cursor-pointer"
                >
                  Send Verification Code
                </button>
              </form>
            )}

            {emailOtpStep === 'otp' && (
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Enter Verification Code</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Enter the 4-digit code sent to {newEmailInput}.
                  </p>
                </div>
                <div>
                  <input
                    type="text"
                    value={emailOtpValue}
                    onChange={(e) => setEmailOtpValue(e.target.value)}
                    placeholder="1234"
                    maxLength={4}
                    className="w-full text-center tracking-widest text-lg font-black border border-slate-300 rounded-xl py-2 focus:outline-none focus:border-indigo-600"
                    autoFocus
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#6b21a8] hover:bg-[#581c87] text-white text-xs font-bold rounded-xl cursor-pointer"
                >
                  Confirm & Update
                </button>
              </form>
            )}

            {emailOtpStep === 'success' && (
              <div className="text-center py-4 space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto animate-bounce" />
                <h3 className="text-sm font-bold text-slate-900">Email Address Updated!</h3>
                <p className="text-xs text-slate-500">Your profile has been updated successfully.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          INTERACTIVE MODAL: Saved Payment Details
         ========================================================================= */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4 relative">
            <button
              type="button"
              onClick={() => setShowPaymentModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900">Saved Payment Details</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Manage your wallets, linked UPI accounts, and cards.
              </p>
            </div>

            <div className="space-y-2.5 pt-1">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-800">UrgentLyfe Wallet</p>
                  <p className="text-[11px] text-slate-500">Available Balance</p>
                </div>
                <span className="text-sm font-black text-emerald-600 font-mono">
                  ₹{walletBalance}
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-blue-100 text-blue-700 font-bold text-[10px] flex items-center justify-center">
                    UPI
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Linked UPI ID</p>
                    <p className="text-[11px] text-slate-500">
                      {currentUser?.phoneNumber || '9876543210'}@okhdfcbank
                    </p>
                  </div>
                </div>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-semibold">
                  Active
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-800">HDFC Millennia Credit Card</p>
                  <p className="text-[11px] text-slate-500 font-mono">•••• 4821 • Exp 08/28</p>
                </div>
                <button
                  type="button"
                  onClick={() => alert('Card unlinked successfully')}
                  className="text-xs text-rose-600 font-semibold hover:underline cursor-pointer"
                >
                  Unlink
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowPaymentModal(false)}
              className="w-full py-2.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
