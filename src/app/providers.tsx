"use client";

import { Provider } from "@/components/ui/provider";
import { Toaster } from "@/components/ui/toaster";
import { ConfirmationDialogProvider } from "@/providers/ConfirmationDialogProvider";
import { PhaseFormDialogProvider } from "@/providers/PhaseFormDialogProvider";
import { ProjectFormDialogProvider } from "@/providers/ProjectFormDialogProvider";
import { ProjectsProvider } from "@/providers/ProjectsProvider";
import { TaskFormDialogProvider } from "@/providers/TaskFormDialogProvider";
import { UserProvider } from "@/providers/UserProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider forcedTheme="light">
      <UserProvider>
        <ProjectsProvider>
          <PhaseFormDialogProvider>
            <TaskFormDialogProvider>
              <ConfirmationDialogProvider>
                <ProjectFormDialogProvider>
                  {children}
                </ProjectFormDialogProvider>
              </ConfirmationDialogProvider>
            </TaskFormDialogProvider>
          </PhaseFormDialogProvider>
        </ProjectsProvider>
      </UserProvider>
      <Toaster />
    </Provider>
  );
};

export default Providers;
