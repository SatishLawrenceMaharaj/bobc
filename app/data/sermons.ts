export interface Sermon {
  id: string;
  title: string;
  date: string;
  speaker: string;
  description: string;
  fileName: string;
  downloadUrl: string;
}

export const sermons: Sermon[] = [
  {
    id: "sermon-01",
    title: "Divine Acceleration for an End Time Harvest",
    date: "2026-01-20",
    speaker: "Rev. Adhar George",
    description: "A powerful message about God's acceleration in the end times and the harvest of souls.",
    fileName: "divine-acceleration-2026-01-20.pptx",
    downloadUrl: "/downloads/sermons/divine-acceleration-2026-01-20.pptx"
  },
  {
    id: "sermon-02",
    title: "The Spirit of Transformation by Association",
    date: "2026-01-13",
    speaker: "Rev. Adhar George",
    description: "Learn how the company you keep transforms your spirit and destiny.",
    fileName: "transformation-by-association-2026-01-13.pptx",
    downloadUrl: "/downloads/sermons/transformation-by-association-2026-01-13.pptx"
  },
  {
    id: "sermon-03",
    title: "Breakthrough Monday",
    date: "2026-01-06",
    speaker: "Bethel OBC Ministry",
    description: "Start your week with breakthrough principles and wisdom from God's Word.",
    fileName: "breakthrough-monday-2026-01-06.pptx",
    downloadUrl: "/downloads/sermons/breakthrough-monday-2026-01-06.pptx"
  },
];
