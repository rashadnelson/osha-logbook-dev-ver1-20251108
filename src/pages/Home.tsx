import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ShieldCheck, FileText, BarChart3, Download, Clock, Lock, Sparkles } from "lucide-react";

const Home = () => {
  const handleCheckout = () => {
    window.open('https://buy.stripe.com/test_8x2fZi3K99ej6Bz8Ye3Je00', '_blank');
  };

  return (
    <div className="mx-auto max-w-7xl">
      {/* Hero Section */}
      <section className="text-center space-y-6 pt-16 pb-20 px-4">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 mb-4">
          <ShieldCheck className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
          OSHA Compliance Made Simple
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Professional incident logging and reporting for safety officers. Stay compliant, save time, and keep your workplace safe with our comprehensive OSHA logbook solution.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <Button size="lg" className="text-lg h-14 px-8" onClick={handleCheckout}>
            Buy Now
          </Button>
          <Button size="lg" variant="outline" className="text-lg h-14 px-8" asChild>
            <a href="#features">Learn More</a>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Everything You Need for OSHA Compliance</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built specifically for safety officers who need reliable, accurate incident tracking
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            <Card>
              <CardHeader>
                <FileText className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Smart Incident Logging</CardTitle>
                <CardDescription className="text-base">
                  Enter OSHA Form 300/301 data with structured validation, inline guidance, and auto-complete features that prevent errors
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <BarChart3 className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Real-Time Dashboard</CardTitle>
                <CardDescription className="text-base">
                  Track total incidents, lost workdays, and injury classifications with visual analytics and trend reports
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Download className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Compliant Exports</CardTitle>
                <CardDescription className="text-base">
                  Generate OSHA-compliant CSV reports that match official submission formats perfectly
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Clock className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Save Time</CardTitle>
                <CardDescription className="text-base">
                  Reduce incident logging time by up to 70% with smart forms and automated data validation
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Lock className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Secure & Private</CardTitle>
                <CardDescription className="text-base">
                  Your data is encrypted and stored securely. We never share your information with third parties
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <ShieldCheck className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Always Up-to-Date</CardTitle>
                <CardDescription className="text-base">
                  Stay current with the latest OSHA regulations and form requirements automatically
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Simple, Transparent Pricing</h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to stay OSHA compliant
            </p>
          </div>

          <Card className="border-2 border-primary relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-sm font-medium">
              BEST VALUE
            </div>
            <CardHeader className="text-center pb-8 pt-12">
              <CardTitle className="text-2xl mb-2">Annual Subscription</CardTitle>
              <div className="space-y-2">
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-bold">$99</span>
                  <span className="text-muted-foreground">/year</span>
                </div>
                <p className="text-sm text-muted-foreground">That's only $8.25/month</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-3">
                {[
                  "Unlimited incident logging",
                  "Real-time dashboard & analytics",
                  "OSHA-compliant CSV exports",
                  "Form 300, 301, and 300A compliant",
                  "Secure data storage",
                  "Automatic updates"
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-base">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button size="lg" className="w-full text-lg h-14" onClick={handleCheckout}>
                Buy Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Is my data secure?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Absolutely. We use industry-standard encryption and security practices. Your incident data is stored securely and never shared with third parties.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I export my data?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes! Export your data anytime in OSHA-compliant CSV format. Your data is always yours to keep.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Simplify Your OSHA Compliance?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join safety officers who trust OSHA Logbook for their incident tracking and reporting needs.
          </p>
          <Button size="lg" className="text-lg h-14 px-8" onClick={handleCheckout}>
            Buy Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
