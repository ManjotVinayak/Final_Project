import * as React from "react";
import { Activity } from "lucide-react";
import { cn } from "../lib/utils";

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border border-gray-200 bg-white text-gray-900 shadow-sm",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-gray-500", className)} {...props} />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
));
CardFooter.displayName = "CardFooter";

/* ---------------------- PIPELINE STATUS (MAIN COMPONENT) ---------------------- */

const statusConfig = {
  success: {
    label: "Healthy",
    color: "bg-green-500/60",
    textColor: "text-green-600",
    description: "All systems operational",
  },
  warning: {
    label: "Warning",
    color: "bg-yellow-500/60",
    textColor: "text-yellow-600",
    description: "Minor issues detected",
  },
  error: {
    label: "Error",
    color: "bg-red-500/60",
    textColor: "text-red-600",
    description: "Action required",
  },
  critical: {
    label: "Critical",
    color: "bg-rose-600/60",
    textColor: "text-rose-600",
    description: "Immediate attention needed",
  },
};

const Meter = ({ status = "success", lastUpdated }) => {
  const config = statusConfig[status];

  return (
    <Card className="p-6 bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-center gap-3 mb-4">
        <Activity className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">
          Pipeline Status
        </h3>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="relative">
          <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center">
            <div
              className={cn(
                "h-20 w-20 rounded-full flex items-center justify-center animate-pulse",
                config.color
              )}
            >
              <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center">
                <span className={cn("text-2xl font-bold", config.textColor)}>●</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className={cn("text-2xl font-bold mb-1", config.textColor)}>
            {config.label}
          </div>
          <p className="text-sm text-gray-600">
            {config.description}
          </p>
          {lastUpdated && (
            <p className="text-xs text-gray-500 mt-2">
              Last updated: {lastUpdated}
            </p>
          )}
        </div>
      </div>

      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={cn("h-full transition-all duration-500", config.color)}
          style={{
            width:
              status === "success"
                ? "100%"
                : status === "warning"
                ? "75%"
                : status === "error"
                ? "50%"
                : "25%",
          }}
        />
      </div>
    </Card>
  );
};

export default Meter;
