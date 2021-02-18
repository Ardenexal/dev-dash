import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ConfigService} from "../../../core/services/config.service";
import {ActivatedRoute} from "@angular/router";
import {Connection} from "../../../../../interface/connection";
import {Target} from "../../../../../interface/target";
import {Command} from "../../../../../interface/command";
import {combineLatest} from "rxjs";
import {tap} from "rxjs/operators";
import {ElectronService} from "../../../core/services";
import {CommandOutputLine} from "../../../../../interface/command-output-line";
import {FormGroup} from "@angular/forms";
import {FormlyFieldConfig} from "@ngx-formly/core";

@Component({
  selector: 'hx-command',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.scss']
})
export class CommandComponent implements OnInit {

  connection: Connection;
  target: Target;
  command: Command;
  logs: CommandOutputLine[];
  isStarted = false;
  commandOutput: string;
  form: FormGroup;
  fields: FormlyFieldConfig[];
  model: any = {};

  constructor(
    private configService: ConfigService,
    private activatedRoute: ActivatedRoute,
    private electronService: ElectronService,
    private changeDetection: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      const command$ = this.configService.getCommandAsObservable(params.command).pipe(tap(console.log));
      const target$ = this.configService.getTarget(params.connection, params.target).pipe(tap(console.log));
      const connection$ = this.configService.getConnection(params.connection).pipe(tap(console.log));

      combineLatest([connection$, target$, command$]).subscribe(config => {
        console.log(config);
        this.form = new FormGroup({});
        this.connection = config[0];
        this.target = config[1];
        this.command = config[2];

        this.buildOutput();
        this.fields = this.command.arguments.map(argument => {
          this.model[argument.name] = argument.default;
          return {
            key: argument.name,
            type: 'input',
            templateOptions: {
              label: argument.name,
              type: 'text',

            },
            wrappers: ['form-field-horizontal'],
          } as FormlyFieldConfig;
        });

        this.form.valueChanges.subscribe(() => {
          this.buildOutput();
        });
      });
    });
  }

  start(): void {
    this.isStarted = true;
    this.electronService.runCommand(this.connection, this.target, this.command, this.commandOutput)
      .subscribe(output => {
        this.logs = output;
        const newItem = output.slice(-1)[0];
        if (newItem.end === true) {
          this.isStarted = false;
        }
        this.changeDetection.detectChanges();
      });
  }

  buildOutput(): void {
    this.commandOutput = this.command.command;

    this.command.arguments.forEach(argument => {
      let model: string = this.model[argument.name];
      model = this.convertVariables(model);
      if (argument.type == "argument") {
        this.commandOutput += ` ${model}`;
      }

      if (argument.type == "option") {
        this.commandOutput += ` --${argument.name}=${model}`;
      }

      if (argument.type == "flag" && model) {
        this.commandOutput += ` --${argument.name}`;
      }

    });
  }


  private convertVariables(model?: string) {
    if (model) {
      for (const [key, value] of Object.entries(this.target.variables)) {
        model = model.replace(`{{${key}}}`, value);
      }
    }
    return model;
  }
}
