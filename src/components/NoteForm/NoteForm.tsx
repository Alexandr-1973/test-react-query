import css from "./NoteForm.module.css";
import { Field, Form, Formik, type FormikHelpers } from "formik";
import type { Note } from "../../types/note";

interface NoteFormProps {
  onClose: () => void;
  onSubmitNote: (note: Note) => void;
}

export default function NoteForm({ onClose, onSubmitNote }: NoteFormProps) {
  const initialValues: Note = {
    title: "",
    content: "",
    tag: "Todo",
  };

  const handleSubmit = (values: Note, actions: FormikHelpers<Note>) => {
    onSubmitNote(values);
    console.log("Order data:", values);
    actions.resetForm();
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          {/* <span name="title" className={css.error} /> */}
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <Field
            as="textarea"
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
          />
          {/* <span name="content" className={css.error} /> */}
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <Field as="select" id="tag" name="tag" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          {/* <span name="tag" className={css.error} /> */}
        </div>

        <div className={css.actions}>
          <button
            type="button"
            className={css.cancelButton}
            onClick={() => onClose()}
          >
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={false}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}
