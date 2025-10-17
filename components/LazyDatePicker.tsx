"use client";
import { lazy, Suspense } from 'react';

const ReactDatePicker = lazy(() => import('react-datepicker'));

interface LazyDatePickerProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  placeholderText: string;
  className?: string;
  minDate?: Date;
  maxDate?: Date;
  showTimeSelect?: boolean;
  timeFormat?: string;
  dateFormat?: string;
}

export default function LazyDatePicker(props: LazyDatePickerProps) {
  return (
    <Suspense fallback={
      <input
        type="text"
        placeholder={props.placeholderText}
        className={props.className}
        disabled
      />
    }>
      <ReactDatePicker
        {...props}
        wrapperClassName="w-full"
      />
    </Suspense>
  );
}