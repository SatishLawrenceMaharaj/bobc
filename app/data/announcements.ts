/**
 * CHURCH ANNOUNCEMENTS DATA
 * 
 * HOW TO ADD A NEW ANNOUNCEMENT:
 * 1. Copy the entire announcement object below (the { } block)
 * 2. Paste it at the end of the announcements array
 * 3. Update the fields with your information
 * 4. Make sure each announcement object ends with a comma (except the last one)
 * 
 * FIELDS EXPLAINED:
 * - id: A unique number (just increment from the last announcement)
 * - title: The announcement headline
 * - date: When the event is happening (format: "Month Day, Year")
 * - content: Details about the announcement
 * - priority: How important it is - choose ONE: "high" | "medium" | "low"
 *   * high = appears with red background (urgent/important events)
 *   * medium = appears with yellow background (regular events)
 *   * low = appears with green background (nice to know information)
 */

export interface Announcement {
  id: number;
  title: string;
  date: string;
  content: string;
  priority: "high" | "medium" | "low";
}

export const announcements: Announcement[] = [
  {
    id: 1,
    title: "Sunday Service This Week",
    date: "2026",
    content:
      "Join us this Sunday at 8:00 AM for a powerful message. Kid's church also available for your children from 8:30 AM.",
    priority: "high",
  },
  {
    id: 4,
    title: "Prayer and Fasting on every Wednesday",
    date: "2026",
    content:
      "Join us for prayer and fasting on every Wednesday.",
    priority: "medium",
  },
  {
    id: 6,
    title: "Regional Sports Day",
    date: "March 30th, 2026",
    content:
      "Join us for a day of fun and fellowship.",
    priority: "low",
  },
];

/**
 * TEMPLATE FOR ADDING NEW ANNOUNCEMENTS:
 * 
 * Copy and paste this template, then fill in the details:
 * 
 * {
 *   id: 5,
 *   title: "Your announcement title here",
 *   date: "Month Day, Year",
 *   content: "Describe what's happening, where, what time, and any other important details.",
 *   priority: "high",  // Change to: "high", "medium", or "low"
 * },
 */
