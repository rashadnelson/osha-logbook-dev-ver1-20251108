import { useState, useEffect } from "react";
import { storage } from "@/lib/storage";
import { OSHAIncident, INCIDENT_OUTCOMES, INCIDENT_TYPES } from "@/types/osha";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, FileText, Users, Clock } from "lucide-react";

const Dashboard = () => {
  const [incidents, setIncidents] = useState<OSHAIncident[]>([]);

  useEffect(() => {
    setIncidents(storage.getIncidents());
  }, []);

  const totalIncidents = incidents.length;
  const totalDaysAway = incidents.reduce((sum, inc) => sum + inc.dafw_num_away, 0);
  const totalDaysRestricted = incidents.reduce((sum, inc) => sum + inc.djtr_num_tr, 0);

  const injuryTypeCounts = incidents.reduce((acc, inc) => {
    const type = INCIDENT_TYPES[inc.type_of_incident as keyof typeof INCIDENT_TYPES] || "Unknown";
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Overview of all recorded incidents and metrics
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Incidents</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalIncidents}</div>
            <p className="text-xs text-muted-foreground">Recorded cases</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Days Away</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDaysAway}</div>
            <p className="text-xs text-muted-foreground">Total DAFW</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Days Restricted</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDaysRestricted}</div>
            <p className="text-xs text-muted-foreground">Total DJTR</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Injury Types</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Object.keys(injuryTypeCounts).length}</div>
            <p className="text-xs text-muted-foreground">Unique categories</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Incidents</CardTitle>
          <CardDescription>All recorded workplace incidents</CardDescription>
        </CardHeader>
        <CardContent>
          {incidents.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No incidents recorded yet</p>
              <p className="text-sm mt-2">Create your first incident to get started</p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Case #</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Employee</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Outcome</TableHead>
                    <TableHead className="text-right">DAFW</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {incidents.map((incident) => (
                    <TableRow key={incident.id}>
                      <TableCell className="font-medium">{incident.case_number}</TableCell>
                      <TableCell>{incident.date_of_incident}</TableCell>
                      <TableCell>{incident.job_title}</TableCell>
                      <TableCell>{incident.incident_location}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {INCIDENT_TYPES[incident.type_of_incident as keyof typeof INCIDENT_TYPES]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={incident.incident_outcome === 1 ? "destructive" : "secondary"}>
                          {INCIDENT_OUTCOMES[incident.incident_outcome as keyof typeof INCIDENT_OUTCOMES]}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">{incident.dafw_num_away}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
