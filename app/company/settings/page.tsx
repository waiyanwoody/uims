import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function CompanySettings() {
  return (
    <div className="p-6 md:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your company account preferences
        </p>
      </div>

      {/* Email & Password */}
      <Card className="p-8 border border-border">
        <h2 className="text-xl font-bold text-foreground mb-6">
          Email & Password
        </h2>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-foreground"
            >
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value="hr@techcorp.com"
              className="bg-secondary/50 border-border"
              readOnly
            />
          </div>
          <Button variant="outline" className="border-border bg-transparent">
            Change Password
          </Button>
        </div>
      </Card>

      {/* Notifications */}
      <Card className="p-8 border border-border">
        <h2 className="text-xl font-bold text-foreground mb-6">
          Notifications
        </h2>
        <div className="space-y-4">
          {[
            { label: "Email notifications for new applications", value: true },
            { label: "Monthly internship summary", value: true },
            { label: "Student profile views", value: false },
            { label: "System updates and announcements", value: true },
          ].map((notification, index) => (
            <div key={index} className="flex items-center justify-between">
              <label className="text-sm text-foreground">
                {notification.label}
              </label>
              <Switch defaultChecked={notification.value} />
            </div>
          ))}
        </div>
      </Card>

      {/* Billing & Subscription */}
      <Card className="p-8 border border-border">
        <h2 className="text-xl font-bold text-foreground mb-6">
          Billing & Subscription
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">
                Current Plan
              </p>
              <p className="text-sm text-muted-foreground">Premium Plan</p>
            </div>
            <Button variant="outline" className="border-border bg-transparent">
              Manage Plan
            </Button>
          </div>
        </div>
      </Card>

      <div className="flex justify-end gap-3">
        <Button variant="outline" className="border-border bg-transparent">
          Cancel
        </Button>
        <Button className="bg-primary hover:bg-primary/90">Save Changes</Button>
      </div>
    </div>
  );
}
