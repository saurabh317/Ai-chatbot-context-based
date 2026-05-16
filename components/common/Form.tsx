"use client";

import { Controller, Control, FieldValues, Path } from "react-hook-form";

type FormControllerProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  render: (params: { field: any; fieldState: any }) => React.ReactElement;
};

export function FormLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={`block text-sm font-medium text-gray-300 ${className || ""}`}>{children}</label>;
}

export function FormDescription({ children }: { children: React.ReactNode }) {
  return <p className="text-xs text-gray-400">{children}</p>;
}

export function FormField({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`space-y-2 ${className || ""}`}>{children}</div>;
}

export function Form({ children, ...props }: React.ComponentProps<"form">) {
  return <form className="space-y-4" {...props}>{children}</form>;
}

export function FormController<T extends FieldValues>({
  control,
  name,
  render,
}: FormControllerProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => render({ field, fieldState })}
    />
  );
}

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  field: any;
  fieldState: any;
};

export function InputField({ field, fieldState, ...props }: InputFieldProps) {
  return (
    <div className="space-y-1">
      <input
        {...field}
        {...props}
        className={`w-full px-4 py-2 rounded-xl bg-white/10 border outline-none focus:ring-2 transition ${
          fieldState.error
            ? "border-red-500 focus:ring-red-400"
            : "border-white/10 focus:ring-white/30"
        }`}
      />

      {fieldState.error && (
        <p className="text-xs text-red-400">{fieldState.error.message}</p>
      )}
    </div>
  );
}
