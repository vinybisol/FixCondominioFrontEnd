import { Component, OnInit } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

import {
  ColumnMode,
  DatatableComponent,
  SelectionType,
} from "@swimlane/ngx-datatable";
import { LancamentoService } from "app/shared/servicos/lancamento.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ModalFinanceiroLancamentosComponent } from "app/main/modal/modal-financeiro-lancamentos/modal-financeiro-lancamentos.component";

@Component({
  selector: "app-financeiro",
  templateUrl: "./financeiro.component.html",
  styleUrls: ["./financeiro.component.scss"],
})
export class FinanceiroComponent implements OnInit {
  // Private
  private _unsubscribeAll: Subject<any>;
  private tempData = [];

  // public
  public contentHeader: object;
  public rows: any;
  public selected = [];
  public kitchenSinkRows: any;
  public basicSelectedOption: number = 10;
  public ColumnMode = ColumnMode;
  public expanded = {};
  public editingName = {};
  public editingStatus = {};
  public editingAge = {};
  public editingSalary = {};
  public chkBoxSelected = [];
  public SelectionType = SelectionType;
  public exportCSVData;
  public modalReference;

  /**
   * Constructor
   *
   * @param {NgbModal} modalService
   */

  constructor(
    private _lancamentoService: LancamentoService,
    private modalService: NgbModal
  ) {}

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit() {
    this.getAllLancamentos();
    this.contentHeader = {
      headerTitle: "Lançamentos",
      actionButton: true,
      breadcrumb: {
        type: "",
        links: [
          {
            name: "Home",
            isLink: true,
            link: "/",
          },
          {
            name: "Lançamentos",
            isLink: false,
          },
        ],
      },
    };
  }

  getAllLancamentos() {
    this.rows = this._lancamentoService.getAllLancamentos();
    this.kitchenSinkRows = this.rows;
  }

  // modal Open Vertically Centered
  abrirModal() {
    this.modalReference = this.modalService.open(ModalFinanceiroLancamentosComponent, {
      centered: true,
    });
    this.modalReference.result.then((data) => {
      // on close
    }, (reason) => {
      // on dismiss
      this.getAllLancamentos();
    });
  }
}
