import { Routes } from '@angular/router';
import { LoginComponent } from './components/layout/login/login.component';
import { RegisterComponent } from './components/layout/register/register.component';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { DashboardComponent } from './components/layout/dashboard/dashboard.component';
import { AgendamentoListComponent } from './components//agendamento/agendamento-list/agendamento-list.component';
import { AgendamentoFormComponent } from './components//agendamento/agendamento-form/agendamento-form.component';
import { BarbeiroListComponent } from './components/barbeiro/barbeiro-list/barbeiro-list.component';
import { BarbeiroFormComponent } from './components//barbeiro/barbeiro-form/barbeiro-form.component';
import { ClienteListComponent } from './components//cliente/cliente-list/cliente-list.component';
import { ClienteFormComponent } from './components//cliente/cliente-form/cliente-form.component';
import { FuncionarioListComponent } from './components//funcionario/funcionario-list/funcionario-list.component';
import { FuncionarioFormComponent } from './components//funcionario/funcionario-form/funcionario-form.component';
import { ServicoListComponent } from './components//servico/servico-list/servico-list.component';
import { ServicoFormComponent } from './components//servico/servico-form/servico-form.component';
import { AdminComponent } from './components/layout/admin/admin.component';

export const routes: Routes = [
    {path: "", redirectTo: "login", pathMatch: 'full'},
    {path: "login", component: LoginComponent},
    {path: "register", component: RegisterComponent},
    {path: "admin", component: PrincipalComponent, children:[
        {path: "dashboard", component: DashboardComponent},

        { path: "pagina-admin", component: AdminComponent },


        {path: "agendamento", component: AgendamentoListComponent },
        {path: "agendamento/new", component: AgendamentoFormComponent},
        {path: "agendamento/edit/:id", component: AgendamentoFormComponent},

        {path: "barbeiro", component: BarbeiroListComponent},
        {path: "barbeiro/new", component: BarbeiroFormComponent},
        {path: "barbeiro/edit/:id", component: BarbeiroFormComponent},

        {path: "cliente", component: ClienteListComponent},
        {path: "cliente/new", component: ClienteFormComponent},
        {path: "cliente/edit/:id", component: ClienteFormComponent},

        {path: "funcionario", component: FuncionarioListComponent},
        {path: "funcionario/new", component: FuncionarioFormComponent},
        {path: "funcionario/edit/:id", component: FuncionarioFormComponent},

        {path: "servico", component: ServicoListComponent},
        {path: "servico/new", component: ServicoFormComponent},
        {path: "servico/edit/:id", component: ServicoFormComponent}
    ]}
];