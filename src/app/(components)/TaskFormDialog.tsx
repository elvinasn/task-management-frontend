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
import { CreateTaskDto } from "@/types/requests/create-task-dto";
import { convertISOToCustomFormat } from "@/utils/formatters";
import { TaskStatus } from "@/types/enums/task-status";
import { TaskPriority } from "@/types/enums/task-priority";
import DropdownTile from "./DropdownTile";

const createTaskSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  dueDate: yup.date().required("Due date is required"),
  status: yup.string().required("Status is required"),
  priority: yup.string().required("Priority is required"),
});

type Props = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  initialValues?: CreateTaskDto;
  onSubmit: (values: CreateTaskDto) => Promise<boolean>;
};

const TaskFormDialog = ({
  isOpen,
  onOpenChange,
  initialValues,
  onSubmit,
}: Props) => {
  return (
    <Formik
      initialValues={{
        title: initialValues?.title || "",
        description: initialValues?.description || "",
        dueDate:
          convertISOToCustomFormat(initialValues?.dueDate?.toISOString()) ||
          convertISOToCustomFormat(new Date().toISOString()),
        status: initialValues?.status || TaskStatus.OPEN,
        priority: initialValues?.priority || TaskPriority.LOW,
      }}
      validationSchema={createTaskSchema}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        const success = await onSubmit({
          description: values.description,
          dueDate: new Date(values.dueDate),
          priority: values.priority,
          status: values.status,
          title: values.title,
        });
        if (success) {
          onOpenChange(false);
        }
        setSubmitting(false);
      }}
    >
      {({
        values,
        handleChange,
        isSubmitting,
        errors,
        touched,
        handleSubmit,
        setFieldValue,
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
                  {initialValues ? "Edit Task" : "Create Task"}
                </DialogTitle>
                <DialogCloseTrigger />
              </DialogHeader>
              <DialogBody spaceY="16px">
                <TextInput
                  label="Title"
                  id="title"
                  value={values.title}
                  onChange={handleChange}
                  error={errors.title}
                  touched={touched.title}
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
                  id="dueDate"
                  type="date"
                  label="Due Date"
                  value={values.dueDate}
                  onChange={handleChange}
                  error={errors.dueDate}
                  touched={touched.dueDate}
                />
                <DropdownTile
                  label="Status"
                  id="status"
                  value={values.status}
                  onChange={handleChange}
                  options={[
                    ...Object.values(TaskStatus).map((status) => ({
                      label: status,
                      value: status,
                    })),
                  ]}
                />
                <DropdownTile
                  label="Priority"
                  id="priority"
                  value={values.priority}
                  onChange={handleChange}
                  options={[
                    ...Object.values(TaskPriority).map((priority) => ({
                      label: priority,
                      value: priority,
                    })),
                  ]}
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

export default TaskFormDialog;
