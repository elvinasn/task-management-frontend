import * as yup from "yup";
import { Formik } from "formik";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import TextInput from "@/components/TextInput";
import { CreateProjectDto } from "@/types/requests/create-project-dto";

const createProjectSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
});

type Props = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  initialValues?: CreateProjectDto;
  onSubmit: (values: CreateProjectDto) => Promise<boolean>;
  submitText: string;
};

const ProjectFormDialog = ({
  isOpen,
  onOpenChange,
  initialValues,
  onSubmit,
  submitText,
}: Props) => {
  return (
    <Formik
      initialValues={{
        name: initialValues?.name || "",
        description: initialValues?.description || "",
      }}
      validationSchema={createProjectSchema}
      onSubmit={async (values, { setSubmitting }) => {
        console.log(values);
        setSubmitting(true);
        const success = await onSubmit(values);
        if (success) {
          onOpenChange(false);
        }
      }}
    >
      {({
        values,
        handleChange,
        isSubmitting,
        errors,
        touched,
        handleSubmit,
      }) => (
        <DialogRoot
          open={isOpen}
          onOpenChange={(e) => onOpenChange(e.open)}
          placement="center"
          motionPreset="slide-in-bottom"
          size="md"
        >
          <DialogContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();

                handleSubmit();
              }}
            >
              <DialogHeader>
                <DialogTitle>
                  {initialValues ? "Edit Project" : "Create Project"}
                </DialogTitle>
                <DialogCloseTrigger />
              </DialogHeader>
              <DialogBody spaceY="16px">
                <TextInput
                  label="Name"
                  id="name"
                  value={values.name}
                  onChange={handleChange}
                  error={errors.name}
                  touched={touched.name}
                />
                <TextInput
                  label="Description"
                  id="description"
                  value={values.description}
                  onChange={handleChange}
                  error={errors.description}
                  touched={touched.description}
                />
              </DialogBody>
              <DialogFooter>
                <Button
                  type="submit"
                  loading={isSubmitting}
                  onClick={() => {
                    console.log("submit");
                  }}
                >
                  {submitText}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </DialogRoot>
      )}
    </Formik>
  );
};

export default ProjectFormDialog;
