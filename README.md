## tareas para la noche para la app de boneteria Sofy
  1._ CREAR DOS CONTEXTOS
    1._ crear un contexto general( para consultas muy generales)
      - obtener estadisticas
      - obtener al usuario que entro
      - obetener informacion sobre el inveantario


    2._Crear un contexto para el inventario
      - debera contener las siguientes funciones
        - actualizar un porducto
        - obetner un producto especifico
        - registrar un nuevo producto
        - obtener producto de un tipo en especifico
        - buscar producto

    3._ Crear un contexto para las ventas
      - registrar ventas
      - buscar un venta



			<Input
captureImg?(
				<div className="w-full rounded-lg h-[40rem] bg-[#f7f6f6] flex flex-col gap-5 justify-center items-center">
					<img className="w-[90%] h-[35rem]"	src={captureImg}/>
					<button onClick={handleDeleteImg} className='h-10 pr-5 pl-5 rounded-md bg-[#ff0f0f] text-[#fff] font-bold'>Borrar foto</button>
				</div>):(<ImageProduct setImg={setCaptureImg}/>)