import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
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

interface Student {
  id: string;
  name: string;
  studentNo: string;
  photo?: string;
  rfid: string | null;
  department: string;
  course: string;
  school: string;
}

@Component({
  selector: 'app-students',
  imports: [
    FormsModule,
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
  protected readonly data = signal<Student[]>([
    { id: '1', name: 'AALA, ALIYAH SOPHIA ANGELES', studentNo: '2024-10899', rfid: '0000809359', department: 'CITHM', course: 'BSIHM-CLOCA', school: 'LPL' },
    { id: '2', name: 'AALA, ANNE KATHERINE MANDAL', studentNo: '2023-10921', rfid: '0007191790', department: 'CITHM', course: 'BSICM', school: 'LPL' },
    { id: '3', name: 'AALA, JIRO RAFBERT ANILLO', studentNo: '2020-10801', rfid: '0002263808', department: 'CAS', course: 'BSBIO-MICRO', school: 'LPL' },
    { id: '4', name: 'ABAC, MA. LORREA NAVOA', studentNo: '2023-10824', rfid: null, department: 'CITHM', course: 'BSITM-AVSE', school: 'LPL' },
    { id: '5', name: 'ABACA, KRISTINA KYLE BARLITA', studentNo: '2022-10503', rfid: '0000893232', department: 'CITHM', course: 'BSIHM-CLOHS', school: 'LPL' },
    { id: '6', name: 'ABACAN, DESIREE MAE MANALO', studentNo: '2024-10994', rfid: '0007459677', department: 'CITHM', course: 'BSIHM-CLOCA', school: 'LPL' },
    { id: '7', name: 'ABAD, JETHRO MARCUS DANAO', studentNo: '2025-10149', rfid: '0002865116', department: 'LPUISJH', course: 'HS-JUNIOR', school: 'LPL' },
    { id: '8', name: 'ABADIER, CORBIN JAHNIZEL MAMONONG', studentNo: '2023-10485', rfid: '0002729616', department: 'CBA', course: 'BSA', school: 'LPL' },
  ]);

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
