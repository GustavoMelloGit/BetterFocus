import { QwikCityMockProvider } from "@builder.io/qwik-city";
import { createDOM } from "@builder.io/qwik/testing";
import { describe, expect, it } from "vitest";
import { makeMockTask } from "~/__test__/entities/makeMockTask";
import TaskList, { Props } from "./TaskList";

const renderComponent = async (props: Props) => {
  const { screen, render, userEvent } = await createDOM();
  await render(
    <QwikCityMockProvider>
      <TaskList {...props} />
    </QwikCityMockProvider>,
  );
  return { screen, userEvent };
};

describe("TaskList Component", () => {
  it("should render a list of tasks", async () => {
    const mockTasks = Array.from({ length: 5 }, () => makeMockTask());
    const { screen } = await renderComponent({ list: mockTasks });
    const taskList = screen.querySelector('[data-testid="task-list"]');
    expect(taskList).toBeTruthy();
  });

  it("should display message if task list is empty", async () => {
    const { screen } = await renderComponent({ list: [] });
    const taskList = screen.querySelector('[data-testid="task-list"]');
    expect(taskList).toBeFalsy();
    expect(screen.querySelector('[data-testid="no-items-found"]')).toBeTruthy();
  });

  it("should render a list of tasks with delete button", async () => {
    const mockTasks = Array.from({ length: 5 }, () => makeMockTask());
    const { screen } = await renderComponent({ list: mockTasks });
    const deleteButtons = screen.querySelectorAll(
      '[data-testid="delete-task"]',
    );
    expect(deleteButtons.length).toBe(5);
  });

  it("should render a list of tasks with finish button", async () => {
    const mockTasks = Array.from({ length: 5 }, () =>
      makeMockTask({ completed: false }),
    );
    const { screen } = await renderComponent({ list: mockTasks });
    const finishButtons = screen.querySelectorAll(
      '[data-testid="finish-task"]',
    );
    expect(finishButtons.length).toBe(5);
  });

  it("should render a list of tasks with reopen button", async () => {
    const mockTasks = Array.from({ length: 5 }, () =>
      makeMockTask({ completed: true }),
    );
    const { screen } = await renderComponent({ list: mockTasks });
    const reopenButtons = screen.querySelectorAll(
      '[data-testid="reopen-task"]',
    );
    expect(reopenButtons.length).toBe(5);
  });

  it("should display when task was completed", async () => {
    const mockTasks = Array.from({ length: 5 }, () =>
      makeMockTask({ completed: true }),
    );
    const { screen } = await renderComponent({ list: mockTasks });
    const completedTasks = screen.querySelectorAll(
      '[data-testid="completed-at"]',
    );
    expect(completedTasks.length).toBe(5);
  });

  it("should mark task as completed on click finish task", async () => {
    const mockTasks = Array.from({ length: 2 }, () =>
      makeMockTask({ completed: false }),
    );
    const { screen, userEvent } = await renderComponent({ list: mockTasks });
    const finishButtons = screen.querySelectorAll(
      '[data-testid="finish-task"]',
    );
    await userEvent(finishButtons[0], "change");
    const completedTasks = screen.querySelectorAll(
      '[data-testid="reopen-task"]',
    );
    expect(completedTasks.length).toBe(1);
  });
});
