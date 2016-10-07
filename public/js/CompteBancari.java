public class CompteBancari(){

	private double saldo; 
	private Object token; 
	public CompteBancari(double deposit, Object token) {
		saldo = deposit; this.token = token;
	}
	
	public synchronized void ingres(double quantitat){
		saldo += quantitat; 
	}

	public synchronized double obtenirSaldo(){
		return saldo;
	}
}