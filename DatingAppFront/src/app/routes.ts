import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MemberListComponent } from './components/member/member-list/member-list.component';
import { MessagesComponent } from './components/messages/messages.component';
import { ListComponent } from './components/list/list.component';
import { AuthGuard } from './guards/auth.guard';
import { MemberDetailComponent } from './components/member/member-detail/member-detail.component';
import { MemberDetailResolver } from './resolvers/member-detail.resolver';
import { MemberListResolver } from './resolvers/member-list.resolver';
import { MemberEditComponent } from './components/member/member-edit/member-edit.component';
import { MemberEditResolver } from './resolvers/member-edit.resolver';
import { PreventUnsavedChangesGuard } from './guards/prevent-unsaved-changes.guard';
import { ListsResolver } from './resolvers/lists.resolver';
import { MessagesResolver } from './resolvers/messages.resolver';


export const AppRoutes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: '', component: HomeComponent, outlet: 'home', pathMatch: 'full' },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'members', component: MemberListComponent,
              resolve: {users: MemberListResolver}},
            { path: 'members/:id', component: MemberDetailComponent,
              resolve: {user: MemberDetailResolver}},
            { path: 'member/edit', component: MemberEditComponent,
              resolve: {user: MemberEditResolver}, canDeactivate: [PreventUnsavedChangesGuard]},
            { path: 'messages', component: MessagesComponent,
              resolve: {messages: MessagesResolver}},
            { path: 'lists', component: ListComponent,
              resolve: {users: ListsResolver}},
            { path: '**', redirectTo: 'members', pathMatch: 'full'}
        ]
    },
    { path: '**', redirectTo: 'home', pathMatch: 'full'},
    { path: '', redirectTo: 'home', pathMatch: 'full'}
];
