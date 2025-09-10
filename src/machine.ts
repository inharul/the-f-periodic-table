import { assign, fromCallback, setup } from "xstate";
import { atomWithMachine } from "jotai-xstate";

const initialDuration = 5;
const timerMachine = setup({
  actors: {
    ticks: fromCallback(({ sendBack }) => {
      const interval = setInterval(() => {
        sendBack({ type: "TICK" });
      }, 1000);
      return () => clearInterval(interval);
    }),
  },
  guards: {
    isComplete: ({ context }) => context.elapsed >= context.duration,
    isNotComplete: ({ context }) => context.elapsed < context.duration,
  },
}).createMachine({
  initial: "paused",
  context: {
    elapsed: 0,
    duration: initialDuration,
    interval: 1,
  },

  states: {
    running: {
      invoke: {
        src: "ticks",
      },
      on: {
        TICK: [
          {
            guard: "isComplete",
            target: "completed",
          },
          {
            actions: assign({
              elapsed: ({ context }) => context.elapsed + context.interval,
            }),
          },
        ],
      },
    },
    paused: {},
    completed: {},
  },

  on: {
    "DURATION.UPDATE": {
      actions: assign({
        duration: ({ event }) => event.value,
      }),
    },
    RESET: {
      actions: assign({
        elapsed: 0,
      }),
    },
    START: {
      target: ".running",
      guard: "isNotComplete",
    },
    STOP: {
      target: ".paused",
    },
  },
});

export const timeAtom = atomWithMachine(timerMachine);
