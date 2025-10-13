import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// 10 beautiful gradient combinations
const gradients = [
  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", // Purple-Blue
  "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", // Pink-Red
  "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)", // Blue-Cyan
  "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)", // Green-Teal
  "linear-gradient(135deg, #fa709a 0%, #fee140 100%)", // Pink-Yellow
  "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)", // Mint-Pink
  "linear-gradient(135deg,rgb(253, 192, 105) 0%, #fcb69f 100%)", // Peach-Orange
  "linear-gradient(135deg, #ff9a9e 0%,rgb(181, 3, 125) 100%)", // Coral-Pink
  "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)", // Lavender-Pink
  "linear-gradient(135deg, #fdbb2d 0%, #22c1c3 100%)", // Yellow-Teal
];

// Simple hash function to convert username to a number
function hashUsername(username: string): number {
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    const char = username.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

// Get gradient index based on username
function getGradientIndex(username: string): number {
  const hash = hashUsername(username);
  return hash % gradients.length;
}

// Get initials from name
function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

interface GradientAvatarProps {
  username: string;
  name: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function GradientAvatar({
  username,
  name,
  className = "",
  size = "md",
}: GradientAvatarProps) {
  const gradientIndex = getGradientIndex(username);
  const gradient = gradients[gradientIndex];
  const initials = getInitials(name);

  const sizeClasses = {
    sm: "h-8 w-8 min-w-[2rem] max-w-[2rem] text-xs",
    md: "h-10 w-10 min-w-[2.5rem] max-w-[2.5rem] text-sm",
    lg: "h-12 w-12 min-w-[3rem] max-w-[3rem] text-base",
  };

  return (
    <Avatar className={`${sizeClasses[size]} flex-shrink-0 ${className}`}>
      <AvatarFallback
        className="text-white font-semibold"
        style={{ background: gradient }}
      >
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}

// Export utilities for other components
export { gradients, getGradientIndex, getInitials };
