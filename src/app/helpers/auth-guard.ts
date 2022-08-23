import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { TokenStorageService } from "../services/token-storage.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad {

    constructor(private tokenStorageService: TokenStorageService, private router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        let url: string = state.url;
        return this.checkUserLogin(next, url);
    }
    canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.canActivate(next, state);
    }
    canDeactivate(
        component: unknown,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return true;
    }
    canLoad(
        route: Route,
        segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
        return true;
    }

    checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
        // If we can get the user token from service, it means someone is logged in
        if (!!this.tokenStorageService.getToken()) {
            // Save logged user roles
            const userRole = this.tokenStorageService.getUser().roles;

            // Compare user roles array with app-routing roles for that path. It there is a match, it will be true
            // const found = userRole.some((r: string)=> route.data["role"].includes(r))


            // If route on app-module has roles and if user has NO matching roles, go to home
            // Compare user roles array with app-routing roles for that path. It there is a match, it will be true
            // Another way to compare it is by using indexof, wich should be just a tiny bit faster than includes but is negligeable
            // !userRole.some((r: string)=> route.data["role"].indexOf(r) !== -1)
            if (route.data["role"] && !userRole.some((r: string)=> route.data["role"].includes(r))) {
                this.router.navigate(['/home']);
                return false;
            }

            // If user has any required role, allow access
            return true;
        }
        this.router.navigate(['/home']);
        return false;
    }
}