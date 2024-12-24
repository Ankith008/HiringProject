import { getApplications } from "@/api/apiApplication";
import usefetch from "@/hooks/usefetch";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import ApplicationsCard from "./ApplicationsCard";
import { BarLoader } from "react-spinners";

const CreatedApplication = () => {
  const { user } = useUser();
  const {
    loading: loadingApplications,
    data: applications,
    fn: fnApplications,
  } = usefetch(getApplications, { user_id: user.id });
  useEffect(() => {
    fnApplications();
  }, []);
  if (loadingApplications) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }
  return (
    <div className="flex flex-col gap-2">
      {applications?.map((application) => {
        return (
          <ApplicationsCard
            key={application.id}
            application={application}
            isCandidate
          />
        );
      })}
    </div>
  );
};

export default CreatedApplication;
