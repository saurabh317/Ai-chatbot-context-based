import {
  FormController,
  FormField,
  FormLabel,
  InputField,
} from "@/components/common/Form";

type FieldProps = {
  control: any;
  name: any;
  label: string;
  icon: React.ReactNode;
  type?: string;
  placeholder: string;
};

function AuthInputField({
  control,
  name,
  label,
  icon,
  type = "text",
  placeholder,
}: FieldProps) {
  return (
    <FormField className="mb-5">
      <FormLabel className="flex items-center gap-2 text-white/70 mb-2">
        {icon} {label}
      </FormLabel>

      <FormController
        control={control}
        name={name}
        render={({ field, fieldState }) => (
          <InputField
            field={field}
            fieldState={fieldState}
            type={type}
            placeholder={placeholder}
            className="bg-white/5 border border-white/10 text-white placeholder-white/40 rounded-xl px-4 py-3 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
          />
        )}
      />
    </FormField>
  );
}

export default AuthInputField;
