"use client";

import * as Slider from "@radix-ui/react-slider";

type Props = {
  value: [number, number];
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: [number, number]) => void;
};

export function PriceRangeSlider({
  value,
  min = 0,
  max = 500,
  step = 1,
  onChange,
}: Props) {
  return (
    <div className="space-y-4">
      {/* Values */}
      <div className="flex justify-between text-sm text-gray-700">
        <span>${value[0]}</span>
        <span>${value[1]}</span>
      </div>

      <Slider.Root
        min={min}
        max={max}
        step={step}
        value={value}
        onValueChange={(v) => onChange([v[0], v[1]])}
        className="relative flex items-center w-full h-5 select-none touch-none"
      >
        {/* Track */}
        <Slider.Track className="relative h-2 w-full grow rounded-full bg-gray-200">
          {/* Purple Selected Range */}
          <Slider.Range className="absolute h-full rounded-full bg-violet-600" />
        </Slider.Track>

        {/* Thumbs */}
        <Slider.Thumb className="block w-5 h-5 rounded-full bg-white border-2 border-violet-600 shadow transition hover:scale-110 focus:outline-none focus:ring-2 focus:ring-violet-400" />
        <Slider.Thumb className="block w-5 h-5 rounded-full bg-white border-2 border-violet-600 shadow transition hover:scale-110 focus:outline-none focus:ring-2 focus:ring-violet-400" />
      </Slider.Root>
    </div>
  );
}
