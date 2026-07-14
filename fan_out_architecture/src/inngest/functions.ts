import { inngest } from "./client";
export const hellofunction = inngest.createFunction(
  { id: "hello-world", triggers: [{ event: "api/hello.world" }] },
  async ({ event, step }) => {
    const first_step = await step.run("Executing first Step", async()=>{
        console.log("I will try to return something");
        return {
            step : 1,
            data: {
                email: event.data.email + "(Modified)"
            }
        }
    })
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email || first_step.data.email}` };
  },
);


export const functions = [hellofunction]