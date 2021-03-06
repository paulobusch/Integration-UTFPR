export class Patterns {
    public email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    public phone = /^[(]{0,1}[0-9]{2}[)]{0,1}[-\s\.]{0,1}[0-9]{4,5}[-\s\.]{0,1}[0-9]{4}$/;
    public cpf = /^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}))$/;
    public login = /[a-z,A-Z]/;
}
