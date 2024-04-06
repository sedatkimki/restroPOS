import { Button } from "@/components/ui/button";
import { FieldCard } from "@/components/ui/field-card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const ProfileNameFormSchema = z.object({
  name: z.string().min(2).max(50),
});

export function ProfileNameForm() {
  const form = useForm<z.infer<typeof ProfileNameFormSchema>>({
    resolver: zodResolver(ProfileNameFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (data: z.infer<typeof ProfileNameFormSchema>) => {
    console.log(data);
    toast.success("Form submitted successfully");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FieldCard>
          <FieldCard.Title>Profile Name</FieldCard.Title>
          <FieldCard.Content>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Sedat Korkmaz"
                      className="max-w-xs"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FieldCard.Content>
          <FieldCard.Footer>
            <FieldCard.FooterDescription>
              Update your profile name to reflect your identity.
            </FieldCard.FooterDescription>
            <FieldCard.FooterAction>
              <Button type="submit" size="sm">
                Save
              </Button>
            </FieldCard.FooterAction>
          </FieldCard.Footer>
        </FieldCard>
      </form>
    </Form>
  );
}
