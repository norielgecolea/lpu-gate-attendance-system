import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideChevronDown,
  lucideChevronLeft,
  lucideChevronRight,
  lucideChevronsUpDown,
  lucideChevronUp,
  lucideClock,
  lucideFileDown,
  lucideFileUp,
  lucidePencil,
  lucidePlus,
  lucideRefreshCw,
  lucideSearch,
  lucideTrash2,
  lucideUpload,
} from '@ng-icons/lucide';
import { HlmAvatarImports } from '@spartan-ng/helm/avatar';
import { HlmBadge } from '@spartan-ng/helm/badge';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmCheckbox } from '@spartan-ng/helm/checkbox';
import { HlmInput } from '@spartan-ng/helm/input';
import { HlmSeparator } from '@spartan-ng/helm/separator';
import { HlmTableImports } from '@spartan-ng/helm/table';
import {
  type ColumnDef,
  type PaginationState,
  type RowSelectionState,
  type SortingState,
  createAngularTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from '@tanstack/angular-table';
import { type Student, StudentsStore } from './students.store';

@Component({
  selector: 'app-students',
  imports: [
    FormsModule,
    RouterLink,
    RouterOutlet,
    NgIcon,
    HlmButton,
    HlmInput,
    HlmCheckbox,
    HlmBadge,
    HlmSeparator,
    HlmTableImports,
    HlmAvatarImports,
  ],
  viewProviders: [
    provideIcons({
      lucidePlus,
      lucideRefreshCw,
      lucideTrash2,
      lucideUpload,
      lucideFileDown,
      lucideFileUp,
      lucideSearch,
      lucideClock,
      lucidePencil,
      lucideChevronsUpDown,
      lucideChevronUp,
      lucideChevronDown,
      lucideChevronLeft,
      lucideChevronRight,
    }),
  ],
  templateUrl: './students.html',
})
export class Students {
  private readonly store = inject(StudentsStore);
  protected readonly data = this.store.students;

  protected readonly sorting = signal<SortingState>([]);
  protected readonly globalFilter = signal('');
  protected readonly rowSelection = signal<RowSelectionState>({});
  protected readonly pagination = signal<PaginationState>({ pageIndex: 0, pageSize: 8 });

  private readonly columns: ColumnDef<Student>[] = [
    { id: 'select', enableSorting: false },
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'rfid', header: 'RFID #' },
    { accessorKey: 'department', header: 'Department' },
    { accessorKey: 'course', header: 'Course' },
    { accessorKey: 'school', header: 'School' },
    { id: 'actions', header: 'Action', enableSorting: false },
  ];

  protected readonly table = createAngularTable<Student>(() => ({
    data: this.data(),
    columns: this.columns,
    state: {
      sorting: this.sorting(),
      globalFilter: this.globalFilter(),
      rowSelection: this.rowSelection(),
      pagination: this.pagination(),
    },
    enableRowSelection: true,
    globalFilterFn: 'includesString',
    onSortingChange: (updater) =>
      this.sorting.set(typeof updater === 'function' ? updater(this.sorting()) : updater),
    onGlobalFilterChange: (updater) =>
      this.globalFilter.set(typeof updater === 'function' ? updater(this.globalFilter()) : updater),
    onRowSelectionChange: (updater) =>
      this.rowSelection.set(typeof updater === 'function' ? updater(this.rowSelection()) : updater),
    onPaginationChange: (updater) =>
      this.pagination.set(typeof updater === 'function' ? updater(this.pagination()) : updater),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  }));

  protected sortIcon(state: false | 'asc' | 'desc'): string {
    if (state === 'asc') return 'lucideChevronUp';
    if (state === 'desc') return 'lucideChevronDown';
    return 'lucideChevronsUpDown';
  }

  protected initials(name: string): string {
    const parts = name.replace(',', '').trim().split(/\s+/);
    return ((parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '')).toUpperCase();
  }
}
