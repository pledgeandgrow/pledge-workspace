"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onCompanySupervisorChange,
  onInternshipInfoChange,
  onEducationalInfoChange,
  onAdditionalClausesChange,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onSignaturesChange,
}: ConventionDeStageFormProps) {
  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow text-black">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="student-info">
          <AccordionTrigger className="text-black font-medium">Informations sur l&apos;étudiant</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3">
              <div className="space-y-3">
                <Label htmlFor="student-firstName">Prénom</Label>
                <Input
                  className="text-black bg-white border-gray-300 focus:border-blue-500"
                  id="student-firstName"
                  value={conventionDeStage.studentInfo.firstName}
                  onChange={(e) => onStudentInfoChange({
                    ...conventionDeStage.studentInfo,
                    firstName: e.target.value,
                  })}
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="student-lastName">Nom</Label>
                <Input
                  className="text-black bg-white border-gray-300 focus:border-blue-500"
                  id="student-lastName"
                  value={conventionDeStage.studentInfo.lastName}
                  onChange={(e) => onStudentInfoChange({
                    ...conventionDeStage.studentInfo,
                    lastName: e.target.value,
                  })}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="company-info">
          <AccordionTrigger className="text-black font-medium">Informations sur l&apos;entreprise</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3">
              <div className="space-y-3">
                <Label htmlFor="company-name">Nom de l&apos;entreprise</Label>
                <Input
                  className="text-black bg-white border-gray-300 focus:border-blue-500"
                  id="company-name"
                  value={conventionDeStage.companyInfo.name}
                  onChange={(e) => onCompanyInfoChange({
                    ...conventionDeStage.companyInfo,
                    name: e.target.value,
                  })}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="internship-info">
          <AccordionTrigger className="text-black font-medium">Informations sur le stage</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3">
              <div className="space-y-3">
                <Label htmlFor="internship-startDate">Date de début</Label>
                <Input
                  className="text-black bg-white border-gray-300 focus:border-blue-500"
                  id="internship-startDate"
                  type="date"
                  value={conventionDeStage.internshipInfo.startDate}
                  onChange={(e) => onInternshipInfoChange({
                    ...conventionDeStage.internshipInfo,
                    startDate: e.target.value,
                  })}
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="internship-endDate">Date de fin</Label>
                <Input
                  className="text-black bg-white border-gray-300 focus:border-blue-500"
                  id="internship-endDate"
                  type="date"
                  value={conventionDeStage.internshipInfo.endDate}
                  onChange={(e) => onInternshipInfoChange({
                    ...conventionDeStage.internshipInfo,
                    endDate: e.target.value,
                  })}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="educational-info">
          <AccordionTrigger className="text-black font-medium">Informations sur l&apos;établissement d&apos;enseignement</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3">
              <div className="space-y-3">
                <Label htmlFor="institution-name">Nom de l&apos;établissement</Label>
                <Input
                  className="text-black bg-white border-gray-300 focus:border-blue-500"
                  id="institution-name"
                  value={conventionDeStage.educationalInfo.institution.name}
                  onChange={(e) => onEducationalInfoChange({
                    ...conventionDeStage.educationalInfo,
                    institution: {
                      ...conventionDeStage.educationalInfo.institution,
                      name: e.target.value,
                    },
                  })}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="additional-clauses">
          <AccordionTrigger className="text-black font-medium">Clauses additionnelles</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              <Label htmlFor="additional-clauses">Clauses additionnelles</Label>
              <Textarea
                className="text-black bg-white border-gray-300 focus:border-blue-500"
                id="additional-clauses"
                value={conventionDeStage.additionalClauses}
                onChange={(e) => onAdditionalClausesChange(e.target.value)}
                rows={5}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
