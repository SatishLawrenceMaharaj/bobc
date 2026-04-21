import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
  try {
    console.log("Starting YouTube scrape job...");

    // Run the scrape script
    const { stdout, stderr } = await execAsync("node scripts/scrapeYouTube.js", {
      cwd: process.cwd(),
      timeout: 60000, // 60 seconds timeout
    });

    console.log("Scrape job completed");
    console.log("Output:", stdout);

    if (stderr) {
      console.warn("Warnings:", stderr);
    }

    return NextResponse.json(
      {
        success: true,
        message: "YouTube videos scrape completed successfully",
        output: stdout,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error running scrape job:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    return NextResponse.json(
      {
        success: false,
        message: "Failed to scrape YouTube videos",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
