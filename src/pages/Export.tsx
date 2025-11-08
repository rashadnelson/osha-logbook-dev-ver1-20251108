import { useState, useEffect } from "react";
import { storage } from "@/lib/storage";
import { exportIncidentsToCSV, exportSummariesToCSV } from "@/lib/csv-export";
import { OSHAIncident, OSHA300ASummary } from "@/types/osha";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Download, FileText, CheckCircle2 } from "lucide-react";

const Export = () => {
  const [incidents, setIncidents] = useState<OSHAIncident[]>([]);
  const [summaries, setSummaries] = useState<OSHA300ASummary[]>([]);

  useEffect(() => {
    setIncidents(storage.getIncidents());
    setSummaries(storage.getSummaries());
  }, []);

  const handleExportIncidents = () => {
    if (incidents.length === 0) {
      toast({
        title: "No Data Available",
        description: "There are no incidents to export.",
        variant: "destructive",
      });
      return;
    }

    exportIncidentsToCSV(incidents);
    toast({
      title: "Export Complete",
      description: "OSHA 300/301 incidents exported successfully.",
    });
  };

  const handleExportSummaries = () => {
    if (summaries.length === 0) {
      toast({
        title: "No Data Available",
        description: "There are no summaries to export.",
        variant: "destructive",
      });
      return;
    }

    exportSummariesToCSV(summaries);
    toast({
      title: "Export Complete",
      description: "OSHA 300A summaries exported successfully.",
    });
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Export Data</h1>
        <p className="text-muted-foreground mt-2">
          Generate OSHA-compliant CSV files for submission
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <FileText className="h-8 w-8 text-primary mb-2" />
            <CardTitle>OSHA 300/301 Incidents</CardTitle>
            <CardDescription>
              Export individual incident records matching Form 300/301 schema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-success" />
                <span>Contains all incident narratives</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-success" />
                <span>Includes employee information</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-success" />
                <span>Days away and restricted work data</span>
              </div>
            </div>
            <div className="pt-4 space-y-2">
              <p className="text-sm font-medium">
                Total Incidents: <span className="text-primary">{incidents.length}</span>
              </p>
              <Button 
                onClick={handleExportIncidents} 
                className="w-full gap-2"
                disabled={incidents.length === 0}
              >
                <Download className="h-4 w-4" />
                Export Incidents CSV
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <FileText className="h-8 w-8 text-primary mb-2" />
            <CardTitle>OSHA 300A Summary</CardTitle>
            <CardDescription>
              Export annual summary data matching Form 300A schema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-success" />
                <span>Establishment information</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-success" />
                <span>Annual totals and metrics</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-success" />
                <span>Injury classification breakdown</span>
              </div>
            </div>
            <div className="pt-4 space-y-2">
              <p className="text-sm font-medium">
                Total Summaries: <span className="text-primary">{summaries.length}</span>
              </p>
              <Button 
                onClick={handleExportSummaries} 
                className="w-full gap-2"
                disabled={summaries.length === 0}
              >
                <Download className="h-4 w-4" />
                Export Summary CSV
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="text-lg">Export Guidelines</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="p-3 bg-card rounded-md">
            <p className="font-medium mb-1">✓ Format Compliance</p>
            <p className="text-muted-foreground">
              All exported files match OSHA's official CSV submission format exactly
            </p>
          </div>
          <div className="p-3 bg-card rounded-md">
            <p className="font-medium mb-1">✓ Data Validation</p>
            <p className="text-muted-foreground">
              Fields are validated before export to ensure regulatory compliance
            </p>
          </div>
          <div className="p-3 bg-card rounded-md">
            <p className="font-medium mb-1">✓ Ready for Submission</p>
            <p className="text-muted-foreground">
              Files can be directly uploaded to OSHA's electronic reporting system
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Export;
