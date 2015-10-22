var mocha = require('mocha');//Framework Mocha
var chai = require('chai');//Biblioteca para Mocha, llamada Chai
var expect = chai.expect//Estilo de programción expect, dentro de Chai
chai.use(require('chai-json-schema'));//JSON
chai.use(require('chai-fs'));//FS
chai.use(require('chai-things'));//Things
chai.use(require('chai-http'));//HTTP
chai.use(require('chai-datetime'));//Time

var fs = require('fs');

var datos;
var schema;
var URL = 'http://iblancasa.com/EventosGranada/';


describe('Lectura de ficheros', function () {

	it('El fichero de convocatorias existe', function (done) {
		expect('convocatorias.json').to.be.a.file();
		done();
	});


	it('El Schema existe', function (done) {
		expect('schema.json').to.be.a.file();
		done();
	});


	it('El JSON se puede leer', function (done) {
    fs.readFile('convocatorias.json', 'utf8', function (err, data) {
      if (err) done(err);
      else {
        datos = JSON.parse(data);
        done();
      }
    });
  });


  it('El Schema se puede leer',function(done){
    fs.readFile('schema.json', 'utf8', function (err, data) {
      if (err)
        done(err);
      else {
        schema = JSON.parse(data);
        done();
      }
    });
  });


	it('Las convocatorias concuerdan con el schema', function (done) {
		expect(datos).to.be.jsonSchema(schema);
		done();
	});


});



chai.should();


describe('Comprobando que están propiedades del fichero convocatorias', function () {
	it('Propiedad title', function (done) {
		datos.convocatorias.should.all.have.property('title')
		done();
	});


	it('Propiedad description', function (done) {
		datos.convocatorias.should.all.have.property('description')
		done();
	});


	it('Propiedad kind', function (done) {
		datos.convocatorias.should.all.have.property('kind')
		done();
	});


	it('Propiedad price', function (done) {
		datos.convocatorias.should.all.have.property('price')
		done();
	});


	it('Propiedad img', function (done) {
		datos.convocatorias.should.all.have.property('img')
		done();
	});


	it('Propiedad date', function (done) {
		datos.convocatorias.should.all.have.property('date')
		done();
	});


	it('Propiedad time', function (done) {
		datos.convocatorias.should.all.have.property('time')
		done();
	});


	it('Propiedad address', function (done) {
		datos.convocatorias.should.all.have.property('address')
		done();
	});


	it('Propiedad coordinates', function (done) {
		datos.convocatorias.should.all.have.property('coordinates')
		done();
	});

});



describe('Comprobando que los datos estén bien', function () {
		it('Las fechas de los eventos son en el futuro', function (done) {
					var actual = new Date();
					var fecha;
					var fecha_arr=[];

					for(i = 0; i< datos.convocatorias.length; i++){
						fecha_arr = datos.convocatorias[i].date.split("-");
						fecha = new Date(fecha_arr[0],fecha_arr[1],fecha_arr[2]);

						expect(actual).to.beforeDate(fecha);
					}

					done();
			});

	it('Las imágenes están en la rama gh-pages', function (done) {

		for(i = 0; i < datos.convocatorias.length; i++){
			chai.request(URL).get(datos.convocatorias[i].img).end(function (err, res) {
				if(err)
					done(err)
			});
		}

		done();
	});


});
