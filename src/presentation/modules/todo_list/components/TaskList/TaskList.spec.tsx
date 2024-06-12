import { createDOM } from "@builder.io/qwik/testing";
import { describe, expect, it, vi } from "vitest";
import { makeMockTask } from "~/__test__/entities/makeMockTask";
import TaskList, { Props } from "./TaskList";

vi.mock('@builder.io/qwik-city', async () => {
    const actual = await vi.importActual("@builder.io/qwik-city") as Record<string, unknown>
    return ({
        globalAction$: vi.fn(),
        z: actual.z,
        globalActionQrl: vi.fn(),
        zodQrl: vi.fn()
    })
})

const renderComponent = async (props: Props) => {
    const { screen, render } = await createDOM();
    await render(<TaskList {...props} />);
    return { screen };
}

describe('TaskList Component', () => { 
    it('Should render a list of tasks', async () => {
        const mockTasks = Array.from({ length: 5 }, () => (makeMockTask()))
        const { screen } = await renderComponent({list: mockTasks});
        const taskList = screen.querySelector('[data-testid="task-list"]')
        expect(taskList).toBeTruthy();
    })
 })