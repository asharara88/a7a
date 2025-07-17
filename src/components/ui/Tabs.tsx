import * as React from "react";
import { cn } from "../../utils/cn";

interface TabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

const TabsContext = React.createContext<{
  value: string;
  onValueChange: (value: string) => void;
}>({
  value: "",
  onValueChange: () => {},
});

export const Tabs = React.forwardRef<
  HTMLDivElement,
  TabsProps
>(({
  defaultValue,
  value,
  onValueChange,
  children,
  className,
  ...props
}, ref) => {
  const [tabValue, setTabValue] = React.useState(defaultValue || "");
  
  const actualValue = value !== undefined ? value : tabValue;
  const actualOnValueChange = onValueChange || setTabValue;
  
  return (
    <TabsContext.Provider value={{ value: actualValue, onValueChange: actualOnValueChange }}>
      <div ref={ref} className={cn("", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
});

export const TabsList = React.forwardRef<
  HTMLDivElement,
  TabsListProps
>(({
  children,
  className,
  ...props
}, ref) => {
  return (
    <div 
      ref={ref} 
      className={cn("flex space-x-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg", className)}
      role="tablist"
      {...props}
    >
      {children}
    </div>
  );
});

export const TabsTrigger = React.forwardRef<
  HTMLButtonElement,
  TabsTriggerProps
>(({
  value,
  children,
  className,
  disabled,
  ...props
}, ref) => {
  const { value: selectedValue, onValueChange } = React.useContext(TabsContext);
  const isSelected = selectedValue === value;
  
  return (
    <button
      ref={ref}
      role="tab"
      aria-selected={isSelected}
      disabled={disabled}
      className={cn(
        "px-3 py-1.5 text-sm font-medium rounded-md transition-all focus:outline-none",
        isSelected 
          ? "bg-white dark:bg-gray-700 text-primary shadow-sm" 
          : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      onClick={() => onValueChange(value)}
      {...props}
    >
      {children}
    </button>
  );
});

export const TabsContent = React.forwardRef<
  HTMLDivElement,
  TabsContentProps
>(({
  value,
  children,
  className,
  ...props
}, ref) => {
  const { value: selectedValue } = React.useContext(TabsContext);
  const isSelected = selectedValue === value;
  
  if (!isSelected) return null;
  
  return (
    <div
      ref={ref}
      role="tabpanel"
      className={cn("mt-4", className)}
      {...props}
    >
      {children}
    </div>
  );
});

Tabs.displayName = "Tabs";
TabsList.displayName = "TabsList";
TabsTrigger.displayName = "TabsTrigger";
TabsContent.displayName = "TabsContent";