import type { Remix } from "@remix-run/dom";
import { dom } from "@remix-run/events";
import { FormApi } from "@tanstack/form-core";
import { z } from "zod";

const Schema = z.object({ name: z.string(), email: z.email() });

export function FormExample(this: Remix.Handle) {
  const form = new FormApi({
    defaultValues: {
      name: "",
      email: "",
    },
    validators: {
      onBlur({ value }) {
        console.log("Validating:", value);
        return Schema.safeParse(value).success;
      },
    },
    onSubmit: async ({ value }) => {
      console.log("Form submitted:", value);
      alert(
        `Submitted: ${value.name ?? "No name"} (${value.email ?? "No email"})`,
      );
    },
  });

  this.queueTask(() => {
    this.signal.addEventListener("abort", form.mount(), { once: true });
  });

  const unsubscribe = form.store.subscribe(() => {
    if (this.signal.aborted) return unsubscribe();
    this.update();
  });

  this.signal.addEventListener("abort", () => unsubscribe(), { once: true });

  return () => {
    const state = form.store.state;
    let errors = form.getAllErrors();

    return (
      <>
        <form
          on={[
            dom.submit(async (event) => {
              event.preventDefault();
              await form.handleSubmit();
            }),
          ]}
        >
          <div>
            <label>
              Name:
              <input
                type="text"
                value={state.values.name}
                on={[
                  dom.input((event) => {
                    form.setFieldValue("name", event.currentTarget.value);
                  }),
                ]}
              />
            </label>
          </div>

          <div>
            <label>
              Email:
              <input
                type="text"
                value={state.values.email}
                on={[
                  dom.input((event) => {
                    form.setFieldValue("email", event.currentTarget.value);
                  }),
                ]}
              />
            </label>
          </div>

          {(errors.form.errors.length > 0 ||
            Object.values(errors.fields).some(
              (field) => field.errors.length > 0,
            )) && (
            <div style={{ color: "red" }}>
              <p>Please fix the following errors:</p>
              <ul>
                {errors.form.errors.map((error, index) => (
                  <li key={`form-${index}`}>{String(error)}</li>
                ))}
                {Object.entries(errors.fields).flatMap(([fieldName, field]) =>
                  field.errors.map((error, index) => (
                    <li key={`${fieldName}-${index}`}>
                      {fieldName}: {String(error)}
                    </li>
                  )),
                )}
              </ul>
            </div>
          )}

          <button type="submit" disabled={state.isSubmitting}>
            {state.isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>

        {state.isSubmitted && <p>Form submitted successfully!</p>}
      </>
    );
  };
}
