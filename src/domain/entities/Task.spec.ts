import { beforeEach, describe, expect, it } from "vitest";
import { ValidationError } from "../errors/ValidationError";
import { Task, TaskProps } from "./task";

describe("Task Entity", () => {
  let validTaskProps: TaskProps;

  beforeEach(() => {
    validTaskProps = {
      id: "1",
      title: "Test Task",
      completed: false,
      completedAt: null,
    };
  });

  it("should create a task with valid properties", () => {
    const task = new Task(validTaskProps);
    expect(task.props).toEqual(validTaskProps);
  });

  it("should throw ValidationError for invalid title", () => {
    const invalidProps = { ...validTaskProps, title: 123 as unknown as string };
    expect(() => new Task(invalidProps)).toThrow(ValidationError);
  });

  it("should throw ValidationError for short title", () => {
    const invalidProps = { ...validTaskProps, title: "a" };
    expect(() => new Task(invalidProps)).toThrow(ValidationError);
  });

  it("should throw ValidationError for invalid completedAt", () => {
    const invalidProps = {
      ...validTaskProps,
      completedAt: "invalid" as unknown as number,
    };
    expect(() => new Task(invalidProps)).toThrow(ValidationError);
  });

  it("should throw ValidationError when completing an already completed task", () => {
    const task = new Task({ ...validTaskProps, completed: true });
    expect(() => task.complete()).toThrow(ValidationError);
  });

  it("should throw ValidationError when reopening an already open task", () => {
    const task = new Task(validTaskProps);
    expect(() => task.reopen()).toThrow(ValidationError);
  });

  it("should complete a task", () => {
    const task = new Task(validTaskProps);
    task.complete();
    expect(task.completed).toBe(true);
    expect(task.completedAt).toBeGreaterThan(0);
  });

  it("should reopen a completed task", () => {
    const task = new Task({
      ...validTaskProps,
      completed: true,
      completedAt: Date.now(),
    });
    task.reopen();
    expect(task.completed).toBe(false);
    expect(task.completedAt).toBeNull();
  });
});
