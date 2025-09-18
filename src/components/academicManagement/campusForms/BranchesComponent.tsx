"use client";

import { useEffect, useState } from "react";
import ButtonComponent from "@/components/shared/button/ButtonComponent";
import { BranchesForm } from "@/app/core/interfaces/academicManagement/branches-interfaces";
import { useUI } from "@/providers/ui-context";
import BranchesFormComponent from "./BranchesFormComponent";
import BranchesViewer from "./BranchesViewerComponent";

const BranchesComponent: React.FC<{onNext: () => void, onBack: () => void}> = ({onNext, onBack}) => {
  const { currentCampus, activeNavSteps, handlerSteps } = useUI();
  const [showForm, setShowForm] = useState<boolean>(false);
  const [branches, setBranches] = useState<BranchesForm[] | null>(null);

  useEffect(() => {
    if (currentCampus.branches && currentCampus.branches.length > 0) {
      setBranches(currentCampus.branches);
      activeNavSteps(3);
      handlerSteps(2);
      setShowForm(false);
    }
  }, [currentCampus.branches]);


  return (
    <div className="flex flex-col gap-[1rem]">
      <span className="m-0 font-bold text-[1rem] leading-[1.25rem]">
        Sedes Actuales
      </span>
      {!showForm && branches === null ? (
        <div className="flex justify-center gap-[1.5rem] py-[0.75rem]">
          <div className="py-[0.75rem] px-[1rem] ">
            <h5 className="font-medium text-[1.25rem]">
              No tienes sedes creadas, para crear una sede, presiona el botón
            </h5>
          </div>
          <div className="">
            <ButtonComponent
              className="primary"
              icon={{ path: "/assets/icon/Group.svg", alt: "school-icon" }}
              label="Crear sede"
              onClick={() => {setShowForm(true)}}
            />
          </div>
        </div>
      ) : branches && !showForm ? (<>
        {branches.map((branche: any) => 
          <BranchesViewer
            key={branche.id}
            branche={branche}
            setBranches={setBranches}
            deleteBranches={() => setShowForm(false)}
          />
        )}
        <div className="flex justify-end">
          <ButtonComponent
            className="primary"
            icon={{ path: "/assets/icon/Group.svg", alt: "school-icon" }}
            label="Crear otra sede"
            onClick={() => {setShowForm(true)}}
          />
        </div></>
      ) : (
        <BranchesFormComponent
          resetForm={true}
          hideForm={() => setShowForm(false)} />
      )}
      <hr className="my-[0.5rem]" />
      <div className="w-full absolute bottom-0 bg-white">
          <div className="flex justify-end gap-[1.25rem]">
          <ButtonComponent
              onClick={onBack}
              className="secondary"
              label="Cancelar"
          />
          <ButtonComponent
              blockAccess={branches && branches?.length > 0 ? false : true}
              className="primary"
              onClick={onNext}
              type="submit"
              label="Siguiente"
          />
          </div>
      </div>
    </div>
  );
};

export default BranchesComponent;
