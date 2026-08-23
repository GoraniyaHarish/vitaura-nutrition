package in.gronliv.controller;

import in.gronliv.dto.CreateOrderRequest;
import in.gronliv.dto.OrderResponse;
import in.gronliv.exception.ResourceNotFoundException;
import in.gronliv.service.OrderService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(OrderController.class)
@AutoConfigureMockMvc(addFilters = false)
public class OrderControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private OrderService orderService;

    @Test
    public void shouldCreateOrderSuccessfully() throws Exception {
        CreateOrderRequest request = new CreateOrderRequest();
        request.setCustomerName("John Doe");
        request.setCustomerPhone("9876543210");
        request.setCustomerEmail("john@example.com");
        request.setDeliveryAddress("123 Main St, Rajkot");
        request.setPincode("360001");
        request.setPaymentMethod("DEMO");

        CreateOrderRequest.OrderItemRequest item = new CreateOrderRequest.OrderItemRequest();
        item.setProductId(1L);
        item.setQuantity(2);
        request.setItems(List.of(item));

        OrderResponse mockResponse = new OrderResponse();
        mockResponse.setOrderId("ORD12345");
        mockResponse.setOrderNumber("ORD12345");
        mockResponse.setStatus("PENDING");
        mockResponse.setPaymentStatus("PENDING");
        mockResponse.setSubtotal(49800L);
        mockResponse.setDeliveryFee(3000L);
        mockResponse.setTotal(52800L);

        when(orderService.createOrder(any(CreateOrderRequest.class), anyString())).thenReturn(mockResponse);

        mockMvc.perform(post("/api/orders")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.orderId").value("ORD12345"))
                .andExpect(jsonPath("$.status").value("PENDING"))
                .andExpect(jsonPath("$.total").value(52800));
    }

    @Test
    public void shouldRejectOrderWithInvalidQuantity() throws Exception {
        CreateOrderRequest request = new CreateOrderRequest();
        request.setCustomerName("John Doe");
        request.setCustomerPhone("9876543210");
        request.setDeliveryAddress("123 Main St, Rajkot");
        request.setPincode("360001");

        CreateOrderRequest.OrderItemRequest item = new CreateOrderRequest.OrderItemRequest();
        item.setProductId(1L);
        item.setQuantity(0); // Invalid quantity <= 0
        request.setItems(List.of(item));

        mockMvc.perform(post("/api/orders")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void shouldRejectOrderWithNonExistentProduct() throws Exception {
        CreateOrderRequest request = new CreateOrderRequest();
        request.setCustomerName("John Doe");
        request.setCustomerPhone("9876543210");
        request.setDeliveryAddress("123 Main St, Rajkot");
        request.setPincode("360001");

        CreateOrderRequest.OrderItemRequest item = new CreateOrderRequest.OrderItemRequest();
        item.setProductId(999L);
        item.setQuantity(1);
        request.setItems(List.of(item));

        when(orderService.createOrder(any(CreateOrderRequest.class), anyString()))
                .thenThrow(new ResourceNotFoundException("Product not found"));

        mockMvc.perform(post("/api/orders")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isNotFound());
    }
}
