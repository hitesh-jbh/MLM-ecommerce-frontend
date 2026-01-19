import { contactEmail, contactNumber, websiteName } from "../../../utils/Constants";

// policyContent.js
export const FooterPageData = [
    {
        id: "shipping-cancellation",
        title: "Shipping & Cancellation Policy",
        intro: `At ${websiteName}, we are committed to ensuring a satisfying shopping experience. Please review the following policy to understand our guidelines on returns, refunds, and cancellations.`,
        sections: [
            {
            id: "shipping-eligibility",
            heading: "Return Eligibility",
            items: [
                {
                type: "subheading",
                text: "Return Window"
                },
                {
                type: "paragraph",
                text: "You may initiate a return request within **3 days of receiving your order**."
                },
                {
                type: "list",
                title: "Returns are accepted only in the following cases:",
                points: ["Damaged item", "Defective product", "Wrong product received"]
                },
                {
                type: "note",
                text: "Returns are **not** accepted for items delivered in perfect condition."
                }
            ]
            },
            {
                id: "shipping-process",
                heading: "Return Process",
                items: [
                    {
                    type: "paragraph",
                    text: "To initiate a return, contact us on WhatsApp at **`${contactNumber}`** with your Order Number and photo proof."
                    },
                    {
                    type: "warning",
                    text: "Return requests made via Instagram or email will not be accepted."
                    }
                ]
                }
            ],
            contact: {
                email: `${contactEmail}`,
                whatsapp: `${contactNumber}`            }
        },
    {
        id: "policy",
        title: "Policy",
        intro: `At ${websiteName}, we are committed to ensuring a satisfying shopping experience. Please review the following policy to understand our guidelines on returns, refunds, and cancellations.`,
        sections: [
            {
            id: "eligibility",
            heading: "Return Eligibility",
            items: [
                {
                type: "subheading",
                text: "Return Window"
                },
                {
                type: "paragraph",
                text: "You may initiate a return request within **3 days of receiving your order**."
                },
                {
                type: "list",
                title: "Returns are accepted only in the following cases:",
                points: ["Damaged item", "Defective product", "Wrong product received"]
                },
                {
                type: "note",
                text: "Returns are **not** accepted for items delivered in perfect condition."
                }
            ]
            },
            {
                id: "process",
                heading: "Return Process",
                items: [
                    {
                    type: "paragraph",
                    text: "To initiate a return, contact us on WhatsApp at **`${contactNumber}`** with your Order Number and photo proof."
                    },
                    {
                    type: "warning",
                    text: "Return requests made via Instagram or email will not be accepted."
                    }
                ]
                }
            ],
            contact: {
                email: `${contactEmail}`,
                whatsapp: `${contactNumber}`            }
        },
    {
        id: "retun-refund",
        title: "Return & Refund Policy",
        intro: `At ${websiteName}, we are committed to ensuring a satisfying shopping experience. Please review the following policy to understand our guidelines on returns, refunds, and cancellations.`,
        sections: [
            {
            id: "retun-eligibility",
            heading: "Return Eligibility",
            items: [
                {
                type: "subheading",
                text: "Return Window"
                },
                {
                type: "paragraph",
                text: "You may initiate a return request within **3 days of receiving your order**."
                },
                {
                type: "list",
                title: "Returns are accepted only in the following cases:",
                points: ["Damaged item", "Defective product", "Wrong product received"]
                },
                {
                type: "note",
                text: "Returns are **not** accepted for items delivered in perfect condition."
                }
            ]
            },
            {
                id: "retun-process",
                heading: "Return Process",
                items: [
                    {
                    type: "paragraph",
                    text: "To initiate a return, contact us on WhatsApp at **`${contactNumber}`** with your Order Number and photo proof."
                    },
                    {
                    type: "warning",
                    text: "Return requests made via Instagram or email will not be accepted."
                    }
                ]
                }
            ],
            contact: {
                email: `${contactEmail}`,
                whatsapp: `${contactNumber}`            }
        },
    {
        id: "term-condition",
        title: "Terms & Conditions Policy",
        intro: `At ${websiteName}, we are committed to ensuring a satisfying shopping experience. Please review the following policy to understand our guidelines on returns, refunds, and cancellations.`,
        sections: [
            {
            id: "term-eligibility",
            heading: "Return Eligibility",
            items: [
                {
                type: "subheading",
                text: "Return Window"
                },
                {
                type: "paragraph",
                text: "You may initiate a return request within **3 days of receiving your order**."
                },
                {
                type: "list",
                title: "Returns are accepted only in the following cases:",
                points: ["Damaged item", "Defective product", "Wrong product received"]
                },
                {
                type: "note",
                text: "Returns are **not** accepted for items delivered in perfect condition."
                }
            ]
            },
            {
                id: "term-process",
                heading: "Return Process",
                items: [
                    {
                    type: "paragraph",
                    text: "To initiate a return, contact us on WhatsApp at **`${contactNumber}`** with your Order Number and photo proof."
                    },
                    {
                    type: "warning",
                    text: "Return requests made via Instagram or email will not be accepted."
                    }
                ]
                }
            ],
            contact: {
                email: `${contactEmail}`,
                whatsapp: `${contactNumber}`            }
        },
    {
        id: "privacy-policy",
        title: "Privacy Policy",
        intro: `At ${websiteName}, we are committed to ensuring a satisfying shopping experience. Please review the following policy to understand our guidelines on returns, refunds, and cancellations.`,
        sections: [
            {
            id: "privacy-eligibility",
            heading: "Return Eligibility",
            items: [
                {
                type: "subheading",
                text: "Return Window"
                },
                {
                type: "paragraph",
                text: "You may initiate a return request within **3 days of receiving your order**."
                },
                {
                type: "list",
                title: "Returns are accepted only in the following cases:",
                points: ["Damaged item", "Defective product", "Wrong product received"]
                },
                {
                type: "note",
                text: "Returns are **not** accepted for items delivered in perfect condition."
                }
            ]
            },
            {
                id: "privacy-process",
                heading: "Return Process",
                items: [
                    {
                    type: "paragraph",
                    text: "To initiate a return, contact us on WhatsApp at **`${contactNumber}`** with your Order Number and photo proof."
                    },
                    {
                    type: "warning",
                    text: "Return requests made via Instagram or email will not be accepted."
                    }
                ]
                }
            ],
            contact: {
                email: `${contactEmail}`,
                whatsapp: `${contactNumber}`            }
        },
];