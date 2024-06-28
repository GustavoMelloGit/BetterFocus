import { QwikCityMockProvider } from "@builder.io/qwik-city";
import { createDOM } from "@builder.io/qwik/testing";
import { describe, expect, it } from "vitest";
import { makeMockTask } from "~/__test__/entities/make_mock_task";
import { Props, TaskForm } from ".";

const renderComponent = async (props: Props) => {
  const { screen, render, userEvent } = await createDOM();
  await render(
    <QwikCityMockProvider>
      <TaskForm {...props} />
    </QwikCityMockProvider>,
  );
  return { screen, userEvent };
};

describe("TaskList Component", () => {
  it("should render task form", async () => {
    const mockTasks = Array.from({ length: 5 }, () => makeMockTask().props);
    const { screen } = await renderComponent({ currentList: mockTasks });
    const taskList = screen.querySelector('[data-testid="task-form"]');
    expect(taskList).toBeTruthy();
  });
});
