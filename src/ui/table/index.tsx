import * as React from 'react'

import { clsx } from '@shilong/utils'
import './style.css'

function Table({ className, ...props }: React.ComponentProps<'table'>) {
  return (
    <div data-slot="sl-table-container" className="slTableContainer">
      <table
        data-slot="sl-table"
        className={clsx('slTableBase', className)}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<'thead'>) {
  return (
    <thead
      data-slot="sl-table-header"
      className={clsx('slTableHeader', className)}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<'tbody'>) {
  return (
    <tbody
      data-slot="sl-table-body"
      className={clsx('slTableBody', className)}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<'tfoot'>) {
  return (
    <tfoot
      data-slot="sl-table-footer"
      className={clsx('slTableFooter', className)}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<'tr'>) {
  return (
    <tr
      data-slot="sl-table-row"
      className={clsx('slTableRow', className)}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: React.ComponentProps<'th'>) {
  return (
    <th
      data-slot="sl-table-head"
      className={clsx('slTableHead', className)}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: React.ComponentProps<'td'>) {
  return (
    <td
      data-slot="sl-table-cell"
      className={clsx('slTableCell', className)}
      {...props}
    />
  )
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<'caption'>) {
  return (
    <caption
      data-slot="sl-table-caption"
      className={clsx('slTableCaption', className)}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
