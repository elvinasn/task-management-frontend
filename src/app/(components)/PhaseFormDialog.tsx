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
import { CreatePhaseDto } from "@/types/requests/create-phase-dto";
import { convertISOToCustomFormat } from "@/utils/formatters";

const createPhaseSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  startDate: yup.date().required("Start date is required"),
  endDate: yup
    .date()
    .min(yup.ref("startDate"), "End date must be after start date")
    .required("End date is required"),
});

type Props = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  initialValues?: CreatePhaseDto;
  onSubmit: (values: CreatePhaseDto) => Promise<boolean>;
};

const PhaseFormDialog = ({
  isOpen,
  onOpenChange,
  initialValues,
  onSubmit,
}: Props) => {
  return (
    <Formik
      initialValues={{
        name: initialValues?.name || "",
        description: initialValues?.description || "",
        startDate:
          convertISOToCustomFormat(initialValues?.startDate?.toISOString()) ||
          convertISOToCustomFormat(new Date().toISOString()),
        endDate:
          convertISOToCustomFormat(initialValues?.endDate?.toISOString()) ||
          convertISOToCustomFormat(
            new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString()
          ),
      }}
      validationSchema={createPhaseSchema}
      onSubmit={async (values, { setSubmitting }) => {
        console.log("values", values);
        setSubmitting(true);
        const success = await onSubmit({
          description: values.description,
          endDate: new Date(values.endDate),
          name: values.name,
          startDate: new Date(values.startDate),
        });
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
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>
                  {initialValues ? "Update phase" : "Create phase"}{" "}
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
                <TextInput
                  label="Start Date"
                  id="startDate"
                  type="date"
                  onChange={handleChange}
                  error={errors.startDate}
                  touched={touched.startDate}
                  value={values.startDate}
                />
                <TextInput
                  label="End Date"
                  id="endDate"
                  type="date"
                  onChange={handleChange}
                  error={errors.endDate}
                  touched={touched.endDate}
                  value={values.endDate}
                />
              </DialogBody>
              <DialogFooter>
                <Button type="submit" loading={isSubmitting}>
                  {initialValues ? "Update" : "Create"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </DialogRoot>
      )}
    </Formik>
  );
};

export default PhaseFormDialog;
