import { AccessibilityIcon, AffordabilityIcon, IntegrityIcon } from "../ui/icons"

const coreServices = [
    "General & specialist consultations",
    "Hospitalization (varying room types & durations)",
    "Drugs & immunizations (primary & secondary)",
    "Laboratory & diagnostic tests (ultrasound, x-ray, ECG, etc.)",
    "Physiotherapy, mental health, dental & optical care",
    "Maternity & obstetrics services",
    "Chronic ailment management",
    "Emergency services (ambulance, ICU, stabilization)",
    "Surgery (minor, intermediate, major)",
    "Wellness checks & preventive care",
]

const serviceAccess = [
    "Use valid ID card at chosen hospital",
    "Emergency: Any network hospital, notify Greenshield within 24 hours",
    "Specialist referrals via primary care providers or customer service",
    "No payment required within scheme limits; reimbursement for approved out-of-pocket expenses"
]

export const servicesData = [
    {
        title: "Platinum Plan",
        underlineWord: "Platinum",
        content: "Highest coverage with unlimited admissions, extensive diagnostics, higher limits for chronic ailment treatment, and premium healthcare benefits.",
        coverImage: "https://res.cloudinary.com/doqvfemo3/image/upload/v1754493538/Greenshield-HMO/aa4714bdb4af82f4ae9e63f9a8f9934b80b2910c_ujcedb.jpg",
        image: "https://res.cloudinary.com/doqvfemo3/image/upload/v1754354307/Greenshield-HMO/young_woman_h6cbaf.png",
        briefBenefits: [
            "Unlimited admissions",
            "Cancer care up to N450,000",
            "Surgery up to N600,000",
            "ICU care up to N450,000"
        ],
        benefits: [
            ...coreServices,
            "Unlimited admissions",
            "Cancer care up to N450,000",
            "Surgery up to N600,000",
            "ICU care up to N450,000",
            ...serviceAccess
        ],
        annualPremium: { individual: "N540,000", family: "N2,160,000" },
    },
    {
        title: "Gold Plus Plan",
        underlineWord: "Gold Plus",
        content: "High coverage with private room benefits, generous limits for chronic ailments, and comprehensive specialist care.",
        coverImage: "https://res.cloudinary.com/doqvfemo3/image/upload/v1754493563/Greenshield-HMO/49b77dade6266d850ff961eb8b999ca3b7ae1610_plxhse.jpg",
        image: "https://res.cloudinary.com/doqvfemo3/image/upload/v1754354300/Greenshield-HMO/man_woman_and_child_mnt9ae.png",
        briefBenefits: [
            "Private room (60 days)",
            "Chronic ailment outpatient limit N300,000",
            "Cancer care up to N350,000",
            "Surgery up to N500,000"
        ],
        benefits: [
            ...coreServices,
            "Private room (60 days)",
            "Chronic ailment outpatient limit N300,000",
            "Cancer care up to N350,000",
            "Surgery up to N500,000",
            ...serviceAccess
        ],
        annualPremium: { individual: "N324,000", family: "N1,296,000" },
    },
    {
        title: "Gold Plan",
        underlineWord: "Gold",
        content: "Mid-tier coverage with private room benefits and balanced limits for chronic ailment management, surgeries, and diagnostics.",
        coverImage: "https://res.cloudinary.com/doqvfemo3/image/upload/v1754493535/Greenshield-HMO/7d5ea9b0f8a0c9e2c8d02f2c1e8f7a64d6e14961_kut4oy.jpg",
        image: "https://res.cloudinary.com/doqvfemo3/image/upload/v1754354292/Greenshield-HMO/Business_plan_and_startup_launch_brhabi.png",
        briefBenefits: [
            "Private room (45 days)",
            "Chronic ailment outpatient limit N240,000",
            "Cancer care up to N200,000",
            "Surgery up to N400,000"
        ],
        benefits: [
            ...coreServices,
            "Private room (45 days)",
            "Chronic ailment outpatient limit N240,000",
            "Cancer care up to N200,000",
            "Surgery up to N400,000",
            ...serviceAccess
        ],
        annualPremium: { individual: "N162,000", family: "N648,000" },
    },
    {
        title: "Silver Plan",
        underlineWord: "Silver",
        content: "Affordable semi-private coverage with essential benefits for hospitalization, chronic ailments, and preventive care.",
        coverImage: "https://res.cloudinary.com/doqvfemo3/image/upload/v1754493563/Greenshield-HMO/49b77dade6266d850ff961eb8b999ca3b7ae1610_plxhse.jpg",
        image: "https://res.cloudinary.com/doqvfemo3/image/upload/v1754354300/Greenshield-HMO/man_woman_and_child_mnt9ae.png",
        briefBenefits: [
            "Semi-private room (28 days)",
            "Outpatient limit N180,000",
            "Cancer care up to N150,000",
            "Surgery up to N300,000"
        ],
        benefits: [
            ...coreServices,
            "Semi-private room (28 days)",
            "Outpatient limit N180,000",
            "Cancer care up to N150,000",
            "Surgery up to N300,000",
            ...serviceAccess
        ],
        annualPremium: { individual: "N97,200", family: "N388,800" },
    },
    {
        title: "Bronze Plan",
        underlineWord: "Bronze",
        content: "Entry-level healthcare coverage with essential services for individuals and families at the most affordable rates.",
        coverImage: "https://res.cloudinary.com/doqvfemo3/image/upload/v1754493538/Greenshield-HMO/aa4714bdb4af82f4ae9e63f9a8f9934b80b2910c_ujcedb.jpg",
        image: "https://res.cloudinary.com/doqvfemo3/image/upload/v1754354307/Greenshield-HMO/young_woman_h6cbaf.png",
        briefBenefits: [
            "Standard room (21 days)",
            "Outpatient limit N120,000",
            "Cancer care up to N100,000",
            "Surgery up to N200,000"
        ],
        benefits: [
            ...coreServices,
            "Standard room (21 days)",
            "Outpatient limit N120,000",
            "Cancer care up to N100,000",
            "Surgery up to N200,000",
            ...serviceAccess
        ],
        annualPremium: { individual: "N54,000", family: "N216,000" },
    },
]

export const serviceBenefits = [
    {
        title: "Core Services",
        content: "General & specialist consultations, hospitalization, drugs & immunizations, diagnostics, physiotherapy, dental & optical care, maternity, chronic ailment management, emergency services, surgery, and wellness checks.",
        icon: IntegrityIcon
    },
    {
        title: "Service Access",
        content: "Use valid ID card at chosen hospital. Emergency services available at any network hospital (notify Greenshield within 24 hours). Specialist referrals via primary care providers or customer service. No payment required within limits; reimbursement for approved expenses.",
        icon: AccessibilityIcon
    },
    {
        title: "Plan-Specific Coverage",
        content: "Each plan offers different room types, outpatient limits, surgery coverage, cancer care benefits, and ICU limits according to its tier.",
        icon: AffordabilityIcon
    },
]
