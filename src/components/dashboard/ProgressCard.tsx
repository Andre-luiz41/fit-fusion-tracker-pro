
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ProgressCardProps {
  title: string;
  value: number;
  maxValue: number;
  description?: string;
  variant?: 'default' | 'success' | 'warning';
  prefix?: string;
  suffix?: string;
}

export function ProgressCard({
  title,
  value,
  maxValue,
  description,
  variant = 'default',
  prefix = '',
  suffix = '',
}: ProgressCardProps) {
  const percentage = Math.min(Math.max(Math.round((value / maxValue) * 100), 0), 100);
  
  const getProgressColor = () => {
    if (variant === 'success') return 'bg-fitness-success';
    if (variant === 'warning') return 'bg-fitness-warning';
    return 'bg-fitness-primary';
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
        {description && (
          <CardDescription>{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-2">
          <span className="text-2xl font-bold">
            {prefix}{value}{suffix}
          </span>
          <span className="text-sm text-muted-foreground">
            de {prefix}{maxValue}{suffix}
          </span>
        </div>
        <Progress value={percentage} className={`h-2 ${getProgressColor()}`} />
      </CardContent>
    </Card>
  );
}
