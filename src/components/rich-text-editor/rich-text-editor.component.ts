
import {
  Component,
  ChangeDetectionStrategy,
  viewChild,
  ElementRef,
  afterNextRender,
  OnDestroy,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

declare const Quill: any;

@Component({
  selector: 'app-rich-text-editor',
  template: `<div #editor class="bg-white"></div>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RichTextEditorComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RichTextEditorComponent implements OnDestroy, ControlValueAccessor {
  editorElem = viewChild.required<ElementRef>('editor');
  
  private quillInstance: any;
  private initialValue: string | null = null;

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    afterNextRender(() => this.initializeQuill());
  }

  initializeQuill(): void {
    if (this.quillInstance || !this.editorElem()) return;

    this.quillInstance = new Quill(this.editorElem().nativeElement, {
      theme: 'snow',
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, 4, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'align': [] }, { 'direction': 'rtl' }],
          ['link', 'image', 'video'],
          ['clean']
        ],
      },
    });

    if (this.initialValue) {
      this.quillInstance.root.innerHTML = this.initialValue;
    }

    this.quillInstance.on('text-change', () => {
      // Avoid emitting the initial empty state on load
      if (this.quillInstance.getLength() > 1 || this.quillInstance.root.innerHTML !== '<p><br></p>') {
        this.onChange(this.quillInstance.root.innerHTML);
      } else {
        this.onChange('');
      }
      this.onTouched();
    });
  }

  ngOnDestroy(): void {
    if (this.quillInstance) {
      this.quillInstance = null;
    }
  }

  writeValue(value: any): void {
    if (this.quillInstance) {
      if (value) {
        this.quillInstance.root.innerHTML = value;
      } else {
        this.quillInstance.setText('');
      }
    } else {
      this.initialValue = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (this.quillInstance) {
      this.quillInstance.enable(!isDisabled);
    }
  }
}