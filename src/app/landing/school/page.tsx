import React from "react";
import Search from "@/components/public/school/search/Search";
import Filter from "@/components/public/school/filter/Filter";
import "./style.css";

const SchoolPage: React.FC = () => (
  <div className="content-home flex flex-col gap-4 my-4">
    <Search />
    <div className="flex flex-row gap-4">
      <div className="content-filter">
        <Filter />
      </div>
      <div className="content-grid-school basis-3/4">

      </div>
    </div>
  </div>
);

export default SchoolPage;
