import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FilterIcon } from "lucide-react";
import { notFound } from "next/navigation";
import JobPostingSection from "./components/job-posting-section";
import Form from "next/form";
import LocationSelect from "./components/location-select";
import JobTypeSelect from "./components/job-type-select";

const JOB_SITES = [
  {
    id: "newcomers",
    title: "Newcomers Job Site",
  },
  {
    id: "youth",
    title: "Students Job Site",
  },
  {
    id: "indigenous",
    title: "Indigenous Job Site",
  },
  {
    id: "asylum",
    title: "Asylum Refugees Job Site",
  },
];

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ jobsiteId: string }>;
  searchParams: Promise<{
    query?: string;
    jobType?: string;
    location?: string;
  }>;
}) {
  const { jobsiteId } = await params;
  const { jobType, location } = await searchParams;

  const jobSite = JOB_SITES.find((jobSite) => jobSite.id === jobsiteId);

  if (!jobSite) {
    notFound();
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="border-b p-4">
        <h1 className="text-xl font-bold">{jobSite.title}</h1>
      </header>
      <main className="flex-1 bg-secondary p-4">
        <Card>
          <CardContent className="space-y-4 pt-4">
            <Form action={`/${jobSite.id}`} className="flex gap-2">
              <Input name="query" placeholder="Search Jobs..." />
              <Button>Search</Button>
            </Form>
            <div className="flex gap-2 font-semibold">
              <FilterIcon />
              <span>Filters</span>
            </div>
            <div className="flex gap-2 font-semibold">
              <JobTypeSelect initialJobType={jobType} />
              <LocationSelect initialLocation={location} />
            </div>
          </CardContent>
        </Card>
        <JobPostingSection />
      </main>
    </div>
  );
}
