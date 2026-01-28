import { notFound } from "next/navigation";
import apiServer from "@/app/lib/apiServer.server";
import JobApplicationForm from "@/components/job-application-form/job-application-form";

export const dynamic = "force-dynamic";

async function getJob(id: string) {
  try {
    const api = await apiServer();
    const { data } = await api.get(`/jobs/${id}`);

    return data;
  } catch {
    return null;
  }
}

export default async function JobDetailsPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;

  const job = await getJob(id);

  if (!job) return notFound();

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      {/* Job Header */}
      <div className="mb-10 space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-900">{job.title}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-slate-600">
          <span>📍 {job.location}</span>
          <span>💰 ${job.salary.toLocaleString()} / year</span>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-700">
            {job.status}
          </span>
        </div>
      </div>

      {/* Description */}
      <div className="mb-12 rounded-xl border bg-white p-6 leading-relaxed">
        {job.description}
      </div>

      {/* Apply */}
      <JobApplicationForm />
    </div>
  );
}
