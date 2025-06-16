"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ConventionDeStage, StudentInfo, CompanyInfo, SupervisorInfo, InternshipInfo, EducationalInfo } from "./types";

interface ConventionDeStageFormProps {
  conventionDeStage: ConventionDeStage;
  onStudentInfoChange: (info: StudentInfo) => void;
  onCompanyInfoChange: (info: CompanyInfo) => void;
  onCompanySupervisorChange: (info: SupervisorInfo) => void;
  onInternshipInfoChange: (info: InternshipInfo) => void;
  onEducationalInfoChange: (info: EducationalInfo) => void;
  onAdditionalClausesChange: (clauses: string) => void;
  onSignaturesChange: (signatures: { student: boolean; company: boolean; institution: boolean; date: string }) => void;
}

export function ConventionDeStageForm({
  conventionDeStage,
  onStudentInfoChange,
  onCompanyInfoChange,
  onCompanySupervisorChange,
  onInternshipInfoChange,
  onEducationalInfoChange,
  onAdditionalClausesChange,
  onSignaturesChange,
}: ConventionDeStageFormProps) {
  const [activeTab, setActiveTab] = useState<"student" | "company" | "internship" | "education" | "clauses">("student");

  return (
    <div className="space-y-6">
      {/* Onglets */}
      <div className="flex border-b">
        {[
          { label: "Étudiant·e", value: "student" },
          { label: "Entreprise", value: "company" },
          { label: "Stage", value: "internship" },
          { label: "Établissement", value: "education" },
          { label: "Clauses", value: "clauses" },
        ].map(({ label, value }) => (
          <button
            key={value}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === value
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab(value as typeof activeTab)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Étudiant */}
      {activeTab === "student" && (
        <div className="border border-border rounded-lg p-4">
          <h3 className="font-semibold mb-4">Informations sur l&apos;étudiant·e</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Prénom</Label>
              <Input
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-white"
                value={conventionDeStage.studentInfo.firstName}
                onChange={(e) =>
                  onStudentInfoChange({ ...conventionDeStage.studentInfo, firstName: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Nom</Label>
              <Input
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-white"
                value={conventionDeStage.studentInfo.lastName}
                onChange={(e) =>
                  onStudentInfoChange({ ...conventionDeStage.studentInfo, lastName: e.target.value })
                }
              />
            </div>
          </div>
        </div>
      )}

      {/* Entreprise */}
      {activeTab === "company" && (
        <div className="border border-border rounded-lg p-4">
          <h3 className="font-semibold mb-4">Informations sur l&apos;entreprise</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nom de l&apos;entreprise</Label>
              <Input
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-white"
                value={conventionDeStage.companyInfo.name}
                onChange={(e) =>
                  onCompanyInfoChange({ ...conventionDeStage.companyInfo, name: e.target.value })
                }
              />
            </div>
          </div>
        </div>
      )}

      {/* Stage */}
      {activeTab === "internship" && (
        <div className="border border-border rounded-lg p-4">
          <h3 className="font-semibold mb-4">Informations sur le stage</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Date de début</Label>
              <Input
                type="date"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-white"
                value={conventionDeStage.internshipInfo.startDate}
                onChange={(e) =>
                  onInternshipInfoChange({ ...conventionDeStage.internshipInfo, startDate: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Date de fin</Label>
              <Input
                type="date"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-white"
                value={conventionDeStage.internshipInfo.endDate}
                onChange={(e) =>
                  onInternshipInfoChange({ ...conventionDeStage.internshipInfo, endDate: e.target.value })
                }
              />
            </div>
          </div>
        </div>
      )}

      {/* Établissement */}
      {activeTab === "education" && (
        <div className="border border-border rounded-lg p-4">
          <h3 className="font-semibold mb-4">Établissement d&apos;enseignement</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nom de l&apos;établissement</Label>
              <Input
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-white"
                value={conventionDeStage.educationalInfo.institution.name}
                onChange={(e) =>
                  onEducationalInfoChange({
                    ...conventionDeStage.educationalInfo,
                    institution: {
                      ...conventionDeStage.educationalInfo.institution,
                      name: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>
        </div>
      )}

      {/* Clauses supplémentaires */}
      {activeTab === "clauses" && (
        <div className="border border-border rounded-lg p-4">
          <h3 className="font-semibold mb-4">Clauses additionnelles</h3>
          <div className="space-y-2">
            <Label>Clauses</Label>
            <Textarea
              rows={5}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-white"
              value={conventionDeStage.additionalClauses}
              onChange={(e) => onAdditionalClausesChange(e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
