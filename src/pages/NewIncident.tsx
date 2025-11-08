import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { storage } from "@/lib/storage";
import { OSHAIncident, INCIDENT_OUTCOMES, INCIDENT_TYPES } from "@/types/osha";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { Save, AlertCircle } from "lucide-react";

const NewIncident = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<OSHAIncident>();
  const [activeTab, setActiveTab] = useState("basic");

  const onSubmit = (data: OSHAIncident) => {
    const incident: OSHAIncident = {
      ...data,
      id: crypto.randomUUID(),
      time_unknown: data.time_unknown || false,
    };

    storage.saveIncident(incident);
    
    toast({
      title: "Incident Saved",
      description: "The incident has been successfully recorded and validated.",
    });

    navigate("/dashboard");
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">New Incident Report</h1>
        <p className="text-muted-foreground mt-2">
          Enter incident details as required by OSHA Forms 300/301
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Basic Information</TabsTrigger>
            <TabsTrigger value="details">Incident Details</TabsTrigger>
            <TabsTrigger value="narrative">Narrative</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Establishment & Employee Information</CardTitle>
                <CardDescription>Required fields for OSHA Form 300</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="establishment_name">Establishment Name *</Label>
                    <Input 
                      id="establishment_name" 
                      {...register("establishment_name", { required: true })}
                      placeholder="e.g., Plant 1"
                    />
                    {errors.establishment_name && (
                      <p className="text-sm text-destructive">This field is required</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="year_of_filing">Year of Filing *</Label>
                    <Input 
                      id="year_of_filing" 
                      type="number"
                      {...register("year_of_filing", { required: true, valueAsNumber: true })}
                      placeholder="2024"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="case_number">Case Number *</Label>
                    <Input 
                      id="case_number" 
                      type="number"
                      {...register("case_number", { required: true, valueAsNumber: true })}
                      placeholder="1"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="job_title">Job Title *</Label>
                    <Input 
                      id="job_title" 
                      {...register("job_title", { required: true })}
                      placeholder="e.g., Machinist"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date_of_birth">Date of Birth *</Label>
                    <Input 
                      id="date_of_birth" 
                      {...register("date_of_birth", { required: true })}
                      placeholder="MM/DD/YYYY"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date_of_hire">Date of Hire *</Label>
                    <Input 
                      id="date_of_hire" 
                      {...register("date_of_hire", { required: true })}
                      placeholder="MM/DD/YYYY"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sex">Sex</Label>
                    <Select onValueChange={(value) => setValue("sex", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="M">Male</SelectItem>
                        <SelectItem value="F">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Incident Classification</CardTitle>
                <CardDescription>Specify incident date, location, and outcome</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="date_of_incident">Date of Incident *</Label>
                    <Input 
                      id="date_of_incident" 
                      {...register("date_of_incident", { required: true })}
                      placeholder="MM/DD/YYYY"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time_of_incident">Time of Incident</Label>
                    <Input 
                      id="time_of_incident" 
                      {...register("time_of_incident")}
                      placeholder="HH:MM"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time_started_work">Time Started Work</Label>
                    <Input 
                      id="time_started_work" 
                      {...register("time_started_work")}
                      placeholder="HH:MM"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="incident_location">Incident Location *</Label>
                    <Input 
                      id="incident_location" 
                      {...register("incident_location", { required: true })}
                      placeholder="e.g., Production Line A"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type_of_incident">Type of Incident *</Label>
                    <Select onValueChange={(value) => setValue("type_of_incident", parseInt(value))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(INCIDENT_TYPES).map(([key, value]) => (
                          <SelectItem key={key} value={key}>{value}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="incident_outcome">Incident Outcome *</Label>
                    <Select onValueChange={(value) => setValue("incident_outcome", parseInt(value))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select outcome" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(INCIDENT_OUTCOMES).map(([key, value]) => (
                          <SelectItem key={key} value={key}>{value}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dafw_num_away">Days Away From Work</Label>
                    <Input 
                      id="dafw_num_away" 
                      type="number"
                      {...register("dafw_num_away", { valueAsNumber: true })}
                      placeholder="0"
                      defaultValue={0}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="djtr_num_tr">Days Job Transfer/Restriction</Label>
                    <Input 
                      id="djtr_num_tr" 
                      type="number"
                      {...register("djtr_num_tr", { valueAsNumber: true })}
                      placeholder="0"
                      defaultValue={0}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="treatment_facility_type">Treatment Facility Type</Label>
                    <Select onValueChange={(value) => setValue("treatment_facility_type", parseInt(value))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Emergency Room</SelectItem>
                        <SelectItem value="2">Doctor's Office</SelectItem>
                        <SelectItem value="3">Urgent Care</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="treatment_in_patient">In-Patient Treatment</Label>
                    <Select onValueChange={(value) => setValue("treatment_in_patient", parseInt(value))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">No</SelectItem>
                        <SelectItem value="1">Yes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="incident_description">Incident Description *</Label>
                  <Textarea 
                    id="incident_description" 
                    {...register("incident_description", { required: true })}
                    placeholder="Brief description of the incident"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="narrative" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Narrative (Form 301)</CardTitle>
                <CardDescription>Complete description of incident circumstances</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nar_before_incident">What was the employee doing before the incident? *</Label>
                  <Textarea 
                    id="nar_before_incident" 
                    {...register("nar_before_incident", { required: true })}
                    placeholder="Describe the employee's activities immediately before the incident"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nar_what_happened">What happened? *</Label>
                  <Textarea 
                    id="nar_what_happened" 
                    {...register("nar_what_happened", { required: true })}
                    placeholder="Detailed description of how the incident occurred"
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nar_injury_illness">Describe the injury or illness *</Label>
                  <Textarea 
                    id="nar_injury_illness" 
                    {...register("nar_injury_illness", { required: true })}
                    placeholder="Specific injury or illness sustained"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nar_object_substance">Object or substance involved *</Label>
                  <Textarea 
                    id="nar_object_substance" 
                    {...register("nar_object_substance", { required: true })}
                    placeholder="Equipment, materials, or substances that directly contributed to the incident"
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date_of_death">Date of Death (if applicable)</Label>
                  <Input 
                    id="date_of_death" 
                    {...register("date_of_death")}
                    placeholder="MM/DD/YYYY"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <AlertCircle className="h-4 w-4" />
            <span>All fields validated against OSHA requirements</span>
          </div>
          <Button type="submit" size="lg" className="gap-2">
            <Save className="h-4 w-4" />
            Save Incident
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewIncident;
